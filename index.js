var express = require("express");
var app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const config = require("./config/config");
const sqlQuery = require("./services/query");
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const db = config;

// const getRouteDetails = `SELECT flight_cms.*,
//           JSON_ARRAYAGG
//           (
//             JSON_OBJECT
//               (
//               'id', ffaq.id, 'question', ffaq.Question, 'answer', ffaq.Answer
//               )
//           ) AS faq
//           FROM flight_cms
//           LEFT JOIN flight_faq AS ffaq ON flight_cms.id = ffaq.cmsid
//           WHERE flight_cms.id = ?;`;

app.post("/create", async (req, res) => {
  console.log(req.body, "body be");
  const title = req.body.title;
  const description = req.body.description;
  const keywords = req.body.keywords;
  const htext = req.body.htext;
  const converter = req.body.converter;
  const lowFareTitle = req.body.lowFareTitle;
  const country = req.body.country;
  const lang = req.body.lang;
  const pageType = req.body.pageType;
  const pageSubType = req.body.pageSubType;
  const section = req.body.section;
  const departure = req.body.departure;
  const arrival = req.body.arrival;
  const faqs = req.body.faqs;
  const tablename = req.body.tablename;
  console.log(country, " country");
  console.log(tablename, " tablename");

  try {
    db.query(
      "SELECT iso FROM countries WHERE country_name=?",
      [country],
      (err, domain) => {
        if (err) {
          console.log(err);
        } else if (tablename) {
          console.log(domain[0].iso, "countryname");

          let queryInsert =
            `
            INSERT INTO 
          ` + tablename;
          let argsInsert = [];

          if (tablename === "unique_fs_froms") {
            queryInsert += ` ( 
              title, description, keyword, og_title, og_description,
              heading, content, city_name, url,  
              page_type, language, page_subtype,
              domain, section, status, created_at, updated_at, 
              edit_status, created_status, is_approved, 
              faq_object, reviews_object, last_modified_list
              ) 
              VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)  `;
            argsInsert.push(title);
            argsInsert.push(description);
            argsInsert.push(keywords);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(converter);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(pageType);
            argsInsert.push(lang);
            argsInsert.push(pageSubType);
            argsInsert.push(domain[0].iso);
            argsInsert.push(section);
            argsInsert.push(null);
            argsInsert.push(new Date());
            argsInsert.push(new Date());
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(faqs);
            argsInsert.push(null);
            argsInsert.push(null);
          } else if (tablename === "unique_fs_routes") {
            queryInsert += ` ( 
                title, description, keyword, og_title, og_description,
                heading, content, source, destination, url,  
                page_type, language, page_subtype,
                domain, section, status, created_at, updated_at, 
                edit_status, created_status, is_approved,
                h2_schedule_title, h2_calendar_title, h2_lowest_fare_title, 
                faq_object, reviews_object, last_modified_list
                ) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)  `;
            argsInsert.push(title);
            argsInsert.push(description);
            argsInsert.push(keywords);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(converter);
            argsInsert.push(departure);
            argsInsert.push(arrival);
            argsInsert.push(null);
            argsInsert.push(pageType);
            argsInsert.push(lang);
            argsInsert.push(pageSubType);
            argsInsert.push(domain[0].iso);
            argsInsert.push(section);
            argsInsert.push(null);
            argsInsert.push(new Date().toString());
            argsInsert.push(new Date().toString());
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(htext);
            argsInsert.push(null);
            argsInsert.push(lowFareTitle);
            argsInsert.push(faqs);
            argsInsert.push(null);
            argsInsert.push(null);
          } else if (tablename === "unique_fs_tos") {
            queryInsert += ` ( 
                title, description, keyword, og_title, og_description,
                heading, content, city_name, url,  
                page_type, language, page_subtype,
                domain, section, status, created_at, updated_at, 
                edit_status, created_status, is_approved, 
                faq_object, reviews_object, last_modified_list
                ) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)  `;
            argsInsert.push(title);
            argsInsert.push(description);
            argsInsert.push(keywords);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(converter);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(pageType);
            argsInsert.push(lang);
            argsInsert.push(pageSubType);
            argsInsert.push(domain[0].iso);
            argsInsert.push(section);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(faqs);
            argsInsert.push(null);
            argsInsert.push(null);
          } else if (tablename === "unique_ft_routes") {
            queryInsert += ` ( 
                title, description, keyword, og_title, og_description,
                heading, content, source, destination, url,  
                page_type, language, page_subtype,
                domain, section, status, created_at, updated_at,  
                faq_object, reviews_object, is_approved, last_modified_list,
                edit_status, created_status
                ) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)  `;
            argsInsert.push(title);
            argsInsert.push(description);
            argsInsert.push(keywords);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(converter);
            argsInsert.push(departure);
            argsInsert.push(arrival);
            argsInsert.push(null);
            argsInsert.push(pageType);
            argsInsert.push(lang);
            argsInsert.push(pageSubType);
            argsInsert.push(domain[0].iso);
            argsInsert.push(section);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(faqs);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
          } else if (tablename === "unique_fb_overviews") {
            queryInsert += ` ( 
                  title, description, keyword, og_title, og_description,
                  heading, content, airline_name, url,  
                  page_type, language, page_subtype,
                  domain, section, status, created_at, updated_at, review_content 
                  edit_status, created_status, is_approved,
                  faq_object, reviews_object,  last_modified_list,
                  bottom_content, content_tabs_data,
                  airline_tag_name
                  ) 
                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            argsInsert.push(title);
            argsInsert.push(description);
            argsInsert.push(keywords);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(converter);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(pageType);
            argsInsert.push(lang);
            argsInsert.push(pageSubType);
            argsInsert.push(domain[0].iso);
            argsInsert.push(section);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(faqs);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
          } else if (tablename === "unique_fb_pnr_webs") {
            queryInsert += ` ( 
                  title, description, keyword, og_title, og_description,
                  heading, content, airline_name, url,  
                  page_type, language, page_subtype,
                  domain, section, status, created_at, updated_at,
                  edit_status, created_status, is_approved,
                  faq_object, reviews_object,  last_modified_list
                  ) 
                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            argsInsert.push(title);
            argsInsert.push(description);
            argsInsert.push(keywords);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(converter);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(pageType);
            argsInsert.push(lang);
            argsInsert.push(pageSubType);
            argsInsert.push(domain[0].iso);
            argsInsert.push(section);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(faqs);
            argsInsert.push(null);
            argsInsert.push(null);
          } else if (tablename === "unique_fb_routes") {
            queryInsert += ` ( 
                    title, description, keyword, og_title, og_description, heading, content,
                    source, airline_name, destination, url, page_type, 
                    language, page_subtype, domain, section, status, created_at, 
                    updated_at, edit_status, created_status, is_approved, faq_object, 
                    reviews_object, last_modified_list  
                  ) 
                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CAST(NOW() AS DATETIME),CAST(NOW() AS DATETIME)),?,?,?,?,?,?`;
            argsInsert.push(title);
            argsInsert.push(description);
            argsInsert.push(keywords);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(converter);
            argsInsert.push(departure);
            argsInsert.push(null);
            argsInsert.push(arrival);
            argsInsert.push(null);
            argsInsert.push(pageType);
            argsInsert.push(lang);
            argsInsert.push(pageSubType);
            argsInsert.push(domain[0].iso);
            argsInsert.push(section);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(null);
            argsInsert.push(faqs);
            argsInsert.push(null);
            argsInsert.push(null);
          }

          db.query(queryInsert, argsInsert, (err, resultInsert, fields) => {
            if (err) console.log(err);
            else {
              let queryGet = `SELECT * FROM ` + tablename;
              let argsGet = [];
              db.query(queryGet, (err, resultSend, fields) => {
                if (err) console.log(err);
                else res.send(resultSend);
              });
            }
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.get("/get/:country_code", (req, res) => {
  const code = req.params.country_code;
  db.query(
    "SELECT iso as value, Country as label FROM countries WHERE Countrycode = ?",
    [code],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/country", (req, res) => {
  db.query(
    "SELECT country_name as value, country_name as label FROM countries GROUP BY value, label ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});

app.get("/language", (req, res) => {
  db.query(
    "SELECT language as value, language as label FROM commons GROUP BY value, label ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});

app.get("/pagetype", (req, res) => {
  db.query(
    "SELECT page_type as value, page_type as label FROM commons GROUP BY value, label ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});

app.get("/pagesubtype", (req, res) => {
  db.query(
    "SELECT page_subtype as value, page_subtype as label FROM commons GROUP BY value, label ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});

app.get("/section", (req, res) => {
  db.query(
    "SELECT section as value, section as label FROM commons GROUP BY value, label ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});

// app.get("/category", (req, res) => {
//   db.query(
//     "SELECT Category as value, Category as label FROM flight_filter GROUP BY value, label ",
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         // console.log(result);
//         res.send(result);
//       }
//     }
//   );
// });

app.get("/arrival", (req, res) => {
  db.query(
    "SELECT city_name_en as value, city_name_en as label FROM city_names GROUP BY value, label ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result, "arrival");
        res.send(result);
      }
    }
  );
});

app.get("/departure", (req, res) => {
  db.query(
    "SELECT city_name_en as value, city_name_en as label FROM city_names GROUP BY value, label ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result, "departure");
        res.send(result);
      }
    }
  );
});

app.post("/tabledata", (req, res) => {
  //   console.log(res);
  console.log("  REQ----BODY  " + req.body);

  db.query(
    `SELECT * FROM commons WHERE 
    domain = (select iso from countries WHERE country_name = ?) AND language = ? AND 
    page_type = ? AND page_subtype= ? AND section = ?`,
    [
      req.body.country,
      req.body.lang,
      req.body.pageType,
      req.body.pageSubType,
      req.body.section,
      // req.body.category,
    ],
    (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        res.send([...result]);
      }
    }
  );
});

app.post("/unique", (req, res) => {
  db.query(
    req.body.departure && req.body.arrival && req.body.pageSubType === "routes"
      ? `SELECT * FROM ?? WHERE domain = (select iso from countries WHERE country_name = ?) AND language = ? AND section = ? AND source = ? AND destination = ?`
      : `SELECT * FROM ?? WHERE domain = (select iso from countries WHERE country_name = ?) AND language = ? AND section = ?`,
    [
      req.body.tablename,
      req.body.country,
      req.body.lang,
      req.body.section,
      req.body.departure,
      req.body.arrival,
    ],
    (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        res.send([...result]);
      }
    }
  );
});

// app.post("/unique/fb-pnr", (req, res) => {
//   db.query(`SELECT * FROM unique_fb_pnr_webs`, (err, result, fields) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // console.log(result);
//       res.send([...result]);
//     }
//   });
// });

// app.post("/tableunique", (req, res) => {
//   //   console.log(res);
//   // console.log(req.body);

//   let query = `SELECT * FROM flight_unique as ff WHERE
//   ff.Countrycode = ? AND ff.Language = ? AND
//   ff.PageType = ? AND ff.PageSubType= ? AND ff.Section = ? AND
//   ff.Category = ?`;

//   let args = [
//     req.body.country,
//     req.body.lang,
//     req.body.pageType,
//     req.body.pageSubType,
//     req.body.section,
//     req.body.category,
//   ];

//   if (
//     req.body.arrival &&
//     req.body.arrival.length > 0 &&
//     req.body.departure &&
//     req.body.departure.length > 0
//   ) {
//     query += ` AND ff.Arrival= ? AND ff.Departure = ?`;
//     args.push(req.body.arrival);
//     args.push(req.body.departure);
//   }

//   db.query(query, args, (err, result, fields) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//       res.send([...result]);
//     }
//   });
// });

app.post("/route", async (req, res) => {
  const { departure, arrival } = req.body;

  const query = `SELECT * FROM unique_fb_routes  WHERE source= ? AND destination = ?`;

  // const getCMSId = `SELECT id FROM unique_fb_routes WHERE id = ?`;

  console.log({ departure, arrival },req.body, "body");

  try {
    const route = await sqlQuery(query, [departure, arrival]);
    console.log(route, "hello");
    // const cmsId = await sqlQuery(getCMSId, [route[0].id]);
    // const routeDetails = await sqlQuery(getRouteDetails, [cmsId[0].cmsid]);
    return res.send({
      status: true,
      message: "Success",
      data: {
        ...route[0],
        // routeDetails: routeDetails[0],
      },
    });
  } catch (error) {
    console.log({error});
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

app.post("/update", async (req, res) => {
  console.log(req.body, "bodydata");

  if (req.body.category === "Common") {
    db.query(
      `UPDATE commons
      SET
        title = ?, content = ?, 
        description = ?, keyword = ?, 
        h2_schedule_title = ?, h2_lowest_fare_title = ?, faq_object = ? 
      WHERE id = ?`,
      [
        req.body.title,
        req.body.converter,
        req.body.description,
        req.body.keywords,
        req.body.htext,
        req.body.lowFareTitle,
        req.body.faqs,
        req.body.id,
      ],
      (err, result, fields) => {
        if (err) {
          console.log(err, "heelo");
        } else {
          console.log(result, "data");

          db.query(
            `SELECT * FROM commons WHERE 
          domain = (select iso from countries WHERE country_name = ?) AND language = ? AND 
          page_type = ? AND page_subtype= ? AND section = ?`,
            [
              req.body.country,
              req.body.lang,
              req.body.pageType,
              req.body.pageSubType,
              req.body.section,
              // req.body.category,
            ],
            (err, resultCommon, fields) => {
              console.log(resultCommon);

              if (err) console.log(err);
              else res.send(resultCommon);
            }
          );
        }
      }
    );
  } else {
    let queryUpdate = `UPDATE ?? SET `;
    let argsUpdate = [req.body.tablename];
    let argsGet = [];

    if (
      req.body.departure &&
      req.body.arrival &&
      req.body.pageSubType === "routes"
    ) {
      argsGet = [
        req.body.tablename,
        req.body.country,
        req.body.lang,
        req.body.section,
        req.body.departure,
        req.body.arrival,
      ];
    } else {
      argsGet = [
        req.body.tablename,
        req.body.country,
        req.body.lang,
        req.body.section,
      ];
    }

    //Flight Booking
    if (req.body.tablename === "unique_fb_routes") {
      queryUpdate += `
        title = ?, description = ?, keyword = ?, content = ?, faq_object = ?,
        updated_at = CAST(NOW() AS DATETIME) WHERE id = ?`;
      argsUpdate.push(req.body.title);
      argsUpdate.push(req.body.description);
      argsUpdate.push(req.body.keywords);
      argsUpdate.push(req.body.converter);
      argsUpdate.push(req.body.faqs);
      argsUpdate.push(req.body.id);
    }

    else if (req.body.tablename === "unique_fb_overviews") {
      queryUpdate += `
      title = ?, description = ?, keyword = ?, content = ?, faq_object = ?,
      updated_at = CAST(NOW() AS DATETIME) WHERE id = ?`;
      argsUpdate.push(req.body.title);
      argsUpdate.push(req.body.description);
      argsUpdate.push(req.body.keywords);
      argsUpdate.push(req.body.converter);
      argsUpdate.push(req.body.faqs);
      argsUpdate.push(req.body.id);
    }

    else if (req.body.tablename === "unique_fb_pnr_webs") {
      queryUpdate += `
      title = ?, description = ?, keyword = ?, content = ?, faq_object = ?,
      updated_at = CAST(NOW() AS DATETIME) WHERE id = ?`;
      argsUpdate.push(req.body.title);
      argsUpdate.push(req.body.description);
      argsUpdate.push(req.body.keywords);
      argsUpdate.push(req.body.converter);
      argsUpdate.push(req.body.id);
    }

    //Flight Schedule
    else if (req.body.tablename === "unique_fs_froms") {
      queryUpdate += `
      title = ?, description = ?, keyword = ?, content = ?, faq_object = ?,
      updated_at = CAST(NOW() AS DATETIME) WHERE id = ?`;
      argsUpdate.push(req.body.title);
      argsUpdate.push(req.body.description);
      argsUpdate.push(req.body.keywords);
      argsUpdate.push(req.body.converter);
      argsUpdate.push(req.body.faqs);
      argsUpdate.push(req.body.id);
    }

    else if (req.body.tablename === "unique_fs_routes") {
      queryUpdate += `
      title = ?, description = ?, keyword = ?, content = ?, h2_schedule_title = ?, h2_lowest_fare_title = ?, faq_object = ?,
      updated_at = CAST(NOW() AS DATETIME) WHERE id = ?`;
      argsUpdate.push(req.body.title);
      argsUpdate.push(req.body.description);
      argsUpdate.push(req.body.keywords);
      argsUpdate.push(req.body.converter);
      argsUpdate.push(req.body.htext);
      argsUpdate.push(req.body.lowFareTitle);
      argsUpdate.push(req.body.faqs);
      argsUpdate.push(req.body.id);
    }

    else if (req.body.tablename === "unique_fs_tos") {
      queryUpdate += `
      title = ?, description = ?, keyword = ?, content = ?, faq_object = ?,
      updated_at = CAST(NOW() AS DATETIME) WHERE id = ?`;
      argsUpdate.push(req.body.title);
      argsUpdate.push(req.body.description);
      argsUpdate.push(req.body.keywords);
      argsUpdate.push(req.body.converter);
      argsUpdate.push(req.body.faqs);
      argsUpdate.push(req.body.id);
    }
    
    //Flight Tickets
    else if (req.body.tablename === "unique_ft_routes") {
      queryUpdate += `
      title = ?, description = ?, keyword = ?, content = ?, faq_object = ?,
      updated_at = CAST(NOW() AS DATETIME) WHERE id = ?`;
      argsUpdate.push(req.body.title);
      argsUpdate.push(req.body.description);
      argsUpdate.push(req.body.keywords);
      argsUpdate.push(req.body.converter);
      argsUpdate.push(req.body.faqs);
      argsUpdate.push(req.body.id);
    }


    try {
      const update = await sqlQuery(queryUpdate, argsUpdate);

      const resultSend = await sqlQuery(
        req.body.departure &&
          req.body.arrival &&
          req.body.pageSubType === "routes"
          ? `SELECT * FROM ?? WHERE domain = (select iso from countries WHERE country_name = ?) AND language = ? AND section = ? AND source = ? AND destination = ?`
          : `SELECT * FROM ?? WHERE domain = (select iso from countries WHERE country_name = ?) AND language = ? AND section = ?`,
        argsGet
      );
      res.send(resultSend);
    } catch (err) {
      console.log(err);
    }
  }

  // db.query(
  //   `DELETE FROM flight_faq WHERE cmsid = ?`,
  //   [req.body.id],
  //   (err, resultfaqd, fields) => {
  //     const faqval = req.body.faqs.map((item) => [
  //       item.question,
  //       item.answer,
  //       req.body.id,
  //     ]);
  //     console.log(faqval);
  //     db.query(
  //       `INSERT INTO flight_faq (Question, Answer, cmsid) VALUES ?`,
  //       [faqval],
  //       (err, resultfaqi, fields) => {
  //         // console.log(result);
  //         if (err) {
  //           console.log(err);
  //         } else if (req.body.category === "Unique") {
  //           let query = `SELECT * FROM flight_unique as ff WHERE
  //         ff.Countrycode = ? AND ff.Language = ? AND
  //         ff.PageType = ? AND ff.PageSubType = ? AND ff.Section = ? AND
  //         ff.Category = ?`;
  //           let args = [
  //             req.body.country,
  //             req.body.lang,
  //             req.body.pageType,
  //             req.body.pageSubType,
  //             req.body.section,
  //             req.body.category,
  //           ];

  //           if (req.body.arrival && req.body.arrival.length > 0) {
  //             query += ` AND ff.Arrival= ? `;
  //             args.push(req.body.arrival);
  //           }

  //           if (req.body.departure && req.body.departure.length > 0) {
  //             query += ` AND ff.Departure = ? `;
  //             args.push(req.body.departure);
  //           }

  //           // console.log(result);
  //           console.log(query, args);
  //           db.query(query, args, (err, result1, fields) => {
  //             console.log(result1);
  //             if (err) console.log(err);
  //             else {
  //               res.send(result1);
  //             }
  //           });
  //         } else if (req.body.category === "Common") {
  //           db.query(
  //             ` SELECT * FROM flight_filter as ff WHERE
  //           ff.Countrycode = ? AND ff.Language = ? AND
  //           ff.PageType = ? AND ff.PageSubType = ? AND ff.Section = ? `,
  //             [
  //               req.body.country,
  //               req.body.lang,
  //               req.body.pageType,
  //               req.body.pageSubType,
  //               req.body.section,
  //             ],
  //             (err, result2, fields) => {
  //               console.log(result2);
  //               if (err) console.log(err);
  //               else {
  //                 res.send(result2);
  //               }
  //             }
  //           );
  //         }
  //       }
  //     );
  //   }
  // );
});

app.post("/cms", async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.category === "Common") {
      const route = await sqlQuery(
        ` SELECT * FROM commons WHERE id = ?
        `,
        [req.body.id]
      );
      res.send(route);
    } else {
      const route = await sqlQuery(`SELECT * FROM ?? WHERE id = ?`, [
        req.body.tablename,
        req.body.id,
      ]);
      // console.log(route, "routeqqqqq");
      // route.faq_object = route.faq_object == 'null' ? "[]" : route.faq_object;
      // console.log(route.faq_object, "faq obj");
      res.send(route);
    }
  } catch (err) {
    console.log(err);
  }
  //   db.query(
  //     `
  //       SELECT cmsid FROM flight_uc WHERE uniqueid = ?
  //     `,
  //     [req.body.id],

  //     (err, result, fields) => {
  //       if (result.length === 0) {
  //         console.log(result, "hello");
  //         res.status(400).json({ message: "not found" });
  //       }
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(result);
  //         db.query(getRouteDetails, [result[0].cmsid], (err, result, fields) => {
  //           result[0].faq = result[0].faq ? JSON.parse(result[0].faq) : [];
  //           console.log(result[0]);
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             res.send(result[0]);
  //           }
  //         });
  //       }
  //     }

  //   );
});



// app.post("/faq", (req, res) => {
//   console.log(req.body);
//   db.query(
//     "SELECT cmsid FROM flight_uc WHERE uniqueid = ?",
//     [req.body.id],

//     (err, result, fields) => {
//       if (result.length === 0) {
//         console.log(result, "hello");
//         res.status(400).json({ message: "not found" });
//       }
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(result);
//         db.query(
//           "SELECT * FROM flight_cms WHERE id = ?",
//           [result[0].cmsid],
//           (err, result, fields) => {
//             if (err) {
//               console.log(err);
//             } else {
//               res.send(result[0]);
//             }
//           }
//         );
//       }
//     }
//   );
// });

app.post("/delete", (req, res) => {
  console.log("Delete ---------------");
  console.log(req.body);
  let query = `DELETE FROM `;

  if (req.body.category === "Common") {
    console.log("Cat ", req.body.category);
    query += `commons`;
  } else if (req.body.category === "Unique") {
    console.log("Cat ", req.body.category);
    query += `?? `;
  }
  query += ` WHERE id = ?`;
  let args;
  if (req.body.category === "Common") args = [req.body.id];
  else args = [req.body.tablename, req.body.id];

  db.query(query, args, (err, result, fields) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result);
      if (req.body.category === "Common") {
        db.query(
          ` SELECT * FROM commons WHERE
          domain = (select iso from countries WHERE country_name = ?) AND
          language = ? AND 
          page_type = ? AND page_subtype= ? AND section = ?`,
          [
            req.body.country,
            req.body.lang,
            req.body.pageType,
            req.body.pageSubType,
            req.body.section,
          ],
          (err, result2, fields) => {
            if (err) console.log(err);
            else {
              res.send(result2);
            }
          }
        );
      } else if (req.body.category === "Unique") {
        let argsGet = [];

        if (
          req.body.departure &&
          req.body.arrival &&
          req.body.pageSubType === "routes"
        ) {
          argsGet = [
            req.body.tablename,
            req.body.country,
            req.body.lang,
            req.body.section,
            req.body.departure,
            req.body.arrival,
          ];
        } else {
          argsGet = [
            req.body.tablename,
            req.body.country,
            req.body.lang,
            req.body.section,
          ];
        }

        db.query(
          req.body.departure &&
            req.body.arrival &&
            req.body.pageSubType === "routes"
            ? `SELECT * FROM ?? WHERE domain = (select iso from countries WHERE country_name = ?) AND language = ? AND section = ? AND source = ? AND destination = ?`
            : `SELECT * FROM ?? WHERE domain = (select iso from countries WHERE country_name = ?) AND language = ? AND section = ?`,
          argsGet,
          (err, result3, fields) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result3);
              res.send(result3);
            }
          }
        );
      }
    }
  });
});

const port = process.env.PORT || 8008;
app.listen(port, () => {
  console.log(`port running on ${port}`);
});
