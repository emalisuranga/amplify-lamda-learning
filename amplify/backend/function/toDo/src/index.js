const toDos = [
    { id: "1", name: "wake up 4am" },
    { id: "2", name: "wake up 5am" },
    { id: "3", name: "wake up 6am" },
];

function getToDos() {
    return toDos;
}

function getToDoById(id) {
    return toDos.find((todo) => todo.id === id); // Use find instead of filter
}

const resolvers = {
    Query: {
        todos: () => {
            return getToDos(); // Call the function
        },
        getToDoById: (ctx) => {
            return getToDoById(ctx.arguments.id);
        },
    },
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const typeHandler = resolvers[event.typeName];
    if(typeHandler) {
        // console.log(typeHandler['todos'])
        const resolver = typeHandler[event.fieldName]
        console.log(resolver)
        if(resolver) {
            var result = await resolver(event)
            // console.log(result)
            return result
        }
    }
    throw new Error("resolver not fund")
};
    // console.log(`EVENT: ${JSON.stringify(event)}`);
    // return {
        // statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        // body: JSON.stringify('Hello from Lambda!'),
    // };
   
// };
