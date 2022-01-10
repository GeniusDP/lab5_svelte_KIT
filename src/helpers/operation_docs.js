/* eslint-disable */
export default class OperationDocsHelper {
    QUERY_GetAll = () => {
        return `query MyQuery {
          laba5_todo {
            body
            createdAt
            id
            isChecked
            title
          }
        }`;
    };

    MUTATION_InsertOne = (title, body, checked = false) => {
        return `mutation MyMutation {
          insert_laba5_todo(objects: {body: "${body}", isChecked: ${checked}, title: "${title}"}){
            affected_rows
            returning {
              body
              title
            }
          }
        }`;
    };

    MUTATION_DeleteByQuantity = (title) => `
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
