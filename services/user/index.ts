const findUser = async(email: string, mobile: number, objOption: object) => {
    try {
        return await new Promise((res, rej) => {
            // Simulate some slow I/O
            console.log("++++ ----> findUser: slow operation\n\n");
            setTimeout(() => {
                console.log("<----- Sending response from findUser ---->", new Date().toISOString());
                res(`${email}${mobile}${JSON.stringify(objOption)}`);
            }, 3 * 1e3)
        })
    } catch (error) {
        console.log("Error in findUser !!!!! ", error);
    }
};
const findAllUsers = async(city: string) => {
    try {
        return await new Promise((res, rej) => {
            // Simulate some slow I/O
            console.log("++++ ----> findAllUsers: slow operation\n\n");
            setTimeout(() => {
                console.log("<---- Sending response from findAllUsers ----->", new Date().toISOString());
                res("1000 users were found in city:" + city);
            }, 2 * 1e3)
        })
    } catch (error) {
        console.log("Error in findAllUsers !!!!! ", error);
    }
}
const processCSV = async(fileName: string, userId: string) => {
    try {
        return await new Promise((res, rej) => {
            // Simulate some slow I/O
            console.log("\n\n ++++ ----> processCSV: slow operation \n\n");
            setTimeout(() => {
                console.log("<---- Sending response from processCSV ----->", new Date().toISOString());
                res("10000 lines processed:" + fileName + " " + userId);
            }, 2 * 1e3)
        })
    } catch (error) {
        console.log("Error in processCSV !!!!! ", error);
    }
}

export {
    findUser,
    findAllUsers,
    processCSV
}