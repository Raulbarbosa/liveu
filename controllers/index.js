const tp = require('../connection');

const createUser = async (req, res) => {

    const { nome, sobrenome, email } = req.body;

    let total = 0;

    try {
        await tp.sql(`INSERT INTO tbs_nome (nome, cod) VALUES ('${nome.nome}', ${nome.cod})`).returnRowCount().execute();
        await tp.sql(`INSERT INTO tbs_sobrenome (sobrenome, cod) VALUES ('${sobrenome.sobrenome}',${sobrenome.cod})`).returnRowCount().execute();
        await tp.sql(`INSERT INTO tbs_email (email, cod) VALUES ('${email.email}', ${email.cod})`).returnRowCount().execute();


    } catch (error) {
        console.log(error);
    }

    try {

        const sumCodeName = await tp.sql(`SELECT * FROM tbs_cod_nome WHERE cod = ${nome.cod}`).execute();
        const sumCodeLastName = await tp.sql(`SELECT * FROM tbs_cod_sobrenome WHERE cod = ${sobrenome.cod}`).execute();
        const sumCodeEmail = await tp.sql(`SELECT * FROM tbs_cod_email WHERE cod = ${email.cod}`).execute();

        nome.sum = Number(sumCodeName[0].cod) + Number(sumCodeName[0].soma);
        sobrenome.sum = Number(sumCodeLastName[0].cod) + Number(sumCodeLastName[0].soma);
        email.sum = Number(sumCodeEmail[0].cod) + Number(sumCodeEmail[0].soma);

        total = nome.sum + sobrenome.sum + email.sum;

    } catch (error) {
        console.log(error);
    }

    try {

        const resultQuery = await tp.sql(`
                SELECT DISTINCT tba.id, tba.animal, tba.total, tbc.cor, tbp.pais  FROM tbs_animais tba 
                INNER JOIN tbs_paises tbp ON (tbp.total = tba.total)
                INNER JOIN tbs_cores tbc ON (tbc.total = tba.total)
                LEFT JOIN tbs_cores_excluidas tbce ON (tbce.cor = tbc.cor)
                WHERE tba.total = ${total} AND tbce.total IS NULL;
            `).execute();

        res.json(resultQuery[0])

    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    createUser
}