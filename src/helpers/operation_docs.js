export default class OperationDocsHelper {
    static QUERY_GetAll = () => `
        query MyQuery {
          laba5_todo {
            body
            createdAt
            id
            isChecked
            title
          }
        }
    `;

    static MUTATION_InsertOne = (title, body, checked = false) => `
        mutation MyMutation {
          insert_laba5_todo(objects: {body: "${body}", isChecked: ${checked}, title: "${title}"}){
            affected_rows
            returning {
              body
              title
            }
          }
        }
    `;

    static MUTATION_DeleteByQuantity = (title) => `
        mutation MyMutation{
          delete_laba5_todo(where: {title: {_eq: "${title}"}}) {
            affected_rows
            returning {
              body
              title
            }
          }
        }
    `;
}
