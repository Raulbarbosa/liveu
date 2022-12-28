const url = require('../url');

const createUser = async (req, res) => {
    const { name, lastName, email } = req.body;

    if (!name || !lastName || !email) {
        return res.send('Please fill all the fields');
    }

    try {
        const data = {
            nome: name,
            sobrenome: lastName,
            email: email
        }

        const response = await $.ajax({
            type: "POST",
            url: `${url}`,
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log(response);

        return

        const user = await tp.sql("SELECT col1, col2 FROM dbo.table")
            .execute()
            .then(function (results) {
                // do something with the results
            }).fail(function (err) {
                // do something with the failure
            });

    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    createUser
}