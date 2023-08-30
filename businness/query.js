let query = {
  dashboard: {
    query_super: `SELECT
    (SELECT SUM(u.admin) FROM userlist u) AS admin,
    (SELECT SUM(u.user) FROM userlist u) AS user,
    (SELECT SUM(u.number_of_batches) FROM userlist u) AS batchesAssignbyadmin,
    (SELECT
        SUM(IF(JSON_UNQUOTE(JSON_EXTRACT(s.photo1, '$.photo1')) <> '', 1, 0)) +
        SUM(IF(JSON_UNQUOTE(JSON_EXTRACT(s.photo2, '$.photo2')) <> '', 1, 0)) +
        SUM(IF(JSON_UNQUOTE(JSON_EXTRACT(s.photo3, '$.photo3')) <> '', 1, 0)) +
        SUM(IF(JSON_UNQUOTE(JSON_EXTRACT(s.photo4, '$.photo4')) <> '', 1, 0)) +
        SUM(IF(JSON_UNQUOTE(JSON_EXTRACT(s.photo5, '$.photo5')) <> '', 1, 0))
    FROM studentInfo s) AS images;
    `,
    qwery_admin1: `SELECT COUNT(u.email) as user, count(u.number_of_batches) 
    as countbatch, sum(u.number_of_batches) as sumbatches
     FROM userlist u WHERE u.admin_name=:admin`,
    qwery_admin2: `SELECT
    SUM(IF(JSON_UNQUOTE(JSON_EXTRACT(s.photo1, '$.photo1')) <> '', 1, 0)) +
    SUM(IF(JSON_UNQUOTE(JSON_EXTRACT(s.photo2, '$.photo2')) <> '', 1, 0)) +
    SUM(IF(JSON_UNQUOTE(JSON_EXTRACT(s.photo3, '$.photo3')) <> '', 1, 0)) +
    SUM(IF(JSON_UNQUOTE(JSON_EXTRACT(s.photo4, '$.photo4')) <> '', 1, 0)) +
    SUM(IF(JSON_UNQUOTE(JSON_EXTRACT(s.photo5, '$.photo5')) <> '', 1, 0)) as image
FROM studentInfo s where admin_name=:admin`,
    query_user2: `SELECT
  SUM(IF(JSON_UNQUOTE(JSON_EXTRACT(s.photo1, '$.photo1')) <> '', 1, 0)) +
  SUM(IF(JSON_UNQUOTE(JSON_EXTRACT(s.photo2, '$.photo2')) <> '', 1, 0)) +
  SUM(IF(JSON_UNQUOTE(JSON_EXTRACT(s.photo3, '$.photo3')) <> '', 1, 0)) +
  SUM(IF(JSON_UNQUOTE(JSON_EXTRACT(s.photo4, '$.photo4')) <> '', 1, 0)) +
  SUM(IF(JSON_UNQUOTE(JSON_EXTRACT(s.photo5, '$.photo5')) <> '', 1, 0)) as image
FROM studentInfo s where batch_admin=:user`,
    query_user1: `SELECT u.number_of_batches as batch , count(b.batch_type) as totalusedbatch
FROM userlist as u
INNER JOIN batches b ON u.email = b.username
WHERE u.email=:user`,
  },
};
module.exports = query;
