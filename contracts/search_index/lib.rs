// #![cfg_attr(not(feature = "std"), no_std, no_main)]

// #[ink::contract]
// mod search_index {

//     /// Defines the storage of your contract.
//     /// Add new fields to the below struct in order
//     /// to add new static storage fields to your contract.
//     #[ink(storage)]
//     pub struct SearchIndex {
//         /// Stores a single `bool` value on the storage.
//         value: bool,
//     }

//     impl SearchIndex {
//         /// Constructor that initializes the `bool` value to the given `init_value`.
//         #[ink(constructor)]
//         pub fn new(init_value: bool) -> Self {
//             Self { value: init_value }
//         }

//         /// Constructor that initializes the `bool` value to `false`.
//         ///
//         /// Constructors can delegate to other constructors.
//         #[ink(constructor)]
//         pub fn default() -> Self {
//             Self::new(Default::default())
//         }

//         /// A message that can be called on instantiated contracts.
//         /// This one flips the value of the stored `bool` from `true`
//         /// to `false` and vice versa.
//         #[ink(message)]
//         pub fn flip(&mut self) {
//             self.value = !self.value;
//         }

//         /// Simply returns the current value of our `bool`.
//         #[ink(message)]
//         pub fn get(&self) -> bool {
//             self.value
//         }
//     }

//     /// Unit tests in Rust are normally defined within such a `#[cfg(test)]`
//     /// module and test functions are marked with a `#[test]` attribute.
//     /// The below code is technically just normal Rust code.
//     #[cfg(test)]
//     mod tests {
//         /// Imports all the definitions from the outer scope so we can use them here.
//         use super::*;

//         /// We test if the default constructor does its job.
//         #[ink::test]
//         fn default_works() {
//             let search_index = SearchIndex::default();
//             assert_eq!(search_index.get(), false);
//         }

//         /// We test a simple use case of our contract.
//         #[ink::test]
//         fn it_works() {
//             let mut search_index = SearchIndex::new(false);
//             assert_eq!(search_index.get(), false);
//             search_index.flip();
//             assert_eq!(search_index.get(), true);
//         }
//     }


//     /// This is how you'd write end-to-end (E2E) or integration tests for ink! contracts.
//     ///
//     /// When running these you need to make sure that you:
//     /// - Compile the tests with the `e2e-tests` feature flag enabled (`--features e2e-tests`)
//     /// - Are running a Substrate node which contains `pallet-contracts` in the background
//     #[cfg(all(test, feature = "e2e-tests"))]
//     mod e2e_tests {
//         /// Imports all the definitions from the outer scope so we can use them here.
//         use super::*;

//         /// A helper function used for calling contract messages.
//         use ink_e2e::ContractsBackend;

//         /// The End-to-End test `Result` type.
//         type E2EResult<T> = std::result::Result<T, Box<dyn std::error::Error>>;

//         /// We test that we can upload and instantiate the contract using its default constructor.
//         #[ink_e2e::test]
//         async fn default_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
//             // Given
//             let mut constructor = SearchIndexRef::default();

//             // When
//             let contract = client
//                 .instantiate("search_index", &ink_e2e::alice(), &mut constructor)
//                 .submit()
//                 .await
//                 .expect("instantiate failed");
//             let call_builder = contract.call_builder::<SearchIndex>();

//             // Then
//             let get = call_builder.get();
//             let get_result = client.call(&ink_e2e::alice(), &get).dry_run().await?;
//             assert!(matches!(get_result.return_value(), false));

//             Ok(())
//         }

//         /// We test that we can read and write a value from the on-chain contract.
//         #[ink_e2e::test]
//         async fn it_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
//             // Given
//             let mut constructor = SearchIndexRef::new(false);
//             let contract = client
//                 .instantiate("search_index", &ink_e2e::bob(), &mut constructor)
//                 .submit()
//                 .await
//                 .expect("instantiate failed");
//             let mut call_builder = contract.call_builder::<SearchIndex>();

//             let get = call_builder.get();
//             let get_result = client.call(&ink_e2e::bob(), &get).dry_run().await?;
//             assert!(matches!(get_result.return_value(), false));

//             // When
//             let flip = call_builder.flip();
//             let _flip_result = client
//                 .call(&ink_e2e::bob(), &flip)
//                 .submit()
//                 .await
//                 .expect("flip failed");

//             // Then
//             let get = call_builder.get();
//             let get_result = client.call(&ink_e2e::bob(), &get).dry_run().await?;
//             assert!(matches!(get_result.return_value(), true));

//             Ok(())
//         }
//     }
// }

#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
mod search_index {
    use ink_storage::collections::HashMap;

    #[ink(storage)]
    pub struct SearchIndex {
        contracts: HashMap<AccountId, ContractMetadata>,
    }

    #[derive(scale::Encode, scale::Decode, Default, Clone)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct ContractMetadata {
        name: String,
        address: AccountId,
        abi: Vec<u8>,
        bytecode: Vec<u8>,
        creator_functions: Vec<String>,
        variables_order: Vec<String>,
    }

    impl SearchIndex {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self { contracts: Default::default() }
        }

        #[ink(message)]
        pub fn add_contract(
            &mut self,
            account: AccountId,
            name: String,
            address: AccountId,
            abi: Vec<u8>,
            bytecode: Vec<u8>,
            creator_functions: Vec<String>,
            variables_order: Vec<String>,
        ) {
            let metadata = ContractMetadata {
                name,
                address,
                abi,
                bytecode,
                creator_functions,
                variables_order,
            };
            self.contracts.insert(account, metadata);
        }

        #[ink(message)]
        pub fn get_contract(&self, account: AccountId) -> Option<ContractMetadata> {
            self.contracts.get(&account).cloned()
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;
        use ink_lang as ink;

        #[ink::test]
        fn new_works() {
            let contract = SearchIndex::new();
            assert_eq!(contract.contracts.len(), 0);
        }

        #[ink::test]
        fn add_and_get_contract_works() {
            let mut contract = SearchIndex::new();
            let account_id = AccountId::from([0x1; 32]);
            let metadata = ContractMetadata {
                name: "TestContract".to_string(),
                address: AccountId::from([0x2; 32]),
                abi: vec![1, 2, 3],
                bytecode: vec![4, 5, 6],
                creator_functions: vec!["create".to_string()],
                variables_order: vec!["var1".to_string(), "var2".to_string()],
            };
            contract.add_contract(
                account_id,
                metadata.name.clone(),
                metadata.address,
                metadata.abi.clone(),
                metadata.bytecode.clone(),
                metadata.creator_functions.clone(),
                metadata.variables_order.clone(),
            );

            let stored_metadata = contract.get_contract(account_id).unwrap();
            assert_eq!(stored_metadata.name, "TestContract");
            assert_eq!(stored_metadata.address, AccountId::from([0x2; 32]));
            assert_eq!(stored_metadata.abi, vec![1, 2, 3]);
            assert_eq!(stored_metadata.bytecode, vec![4, 5, 6]);
            assert_eq!(stored_metadata.creator_functions, vec!["create".to_string()]);
            assert_eq!(stored_metadata.variables_order, vec!["var1".to_string(), "var2".to_string()]);
        }
    }
}
