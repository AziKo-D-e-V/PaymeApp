const { fetch, fetchOne } = require("../libs/pg");

const currentUser = async (req, res) => {
  const { id } = req.params;

  const data = await fetchOne("select * from stores where id = $1", id);

  res.status(200).json({ message: "success", data });
};
const stores = async (req, res) => {
  const { id } = req.params;

  const data = await fetch("select username, id from stores");

  res.status(200).json({ message: "success", data });
};

const transactions = async (req, res) => {
  const { from, to, sum } = req.body;

  await fetchOne("BEGIN TRANSACTION");

  await fetchOne(
    "update users SET creditcard = creditcard - $1 where id = $2",
    sum * 1.01,
    from
  );

  await fetchOne("update users SET cashbackcard = cashbackcard + $1 where id = $2", (sum * 1.005 - sum), from);

  await fetchOne("update payme set balance = balance + $1 where id = 1", (sum * 1.01 - sum));

  await fetchOne(
    "update stores SET balance = balance + $1 where id = $2",
    sum,
    to
  );

  const user = await fetchOne("select * from users where id = $1", from);

  if (user.creditcard < sum * 1.01) {
  
    await fetchOne("Rollback");
    res.status(400).json({ message: "Balans yetarli emas" });
  } else {
    await fetchOne("Commit");
    res.status(200).json({ message: "Muvaqqiyatli o'tkazildi" });
  }
};

module.exports = {
  currentUser,
  transactions,
  stores,
};
