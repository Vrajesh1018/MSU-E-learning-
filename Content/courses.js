const courses = [{
    "id": "cs01",
      "courseName": "cse",
      "items": [
        {
          "itemid": "CSEI01",
          "noofcards": 7,
          "domain": "Programing Language",
          "cardlist": [
            {
              "cardId": "CSEC01",
              "cardTitle": "Programin in C",
              "desc": "This is a card related to programing language",
              "author": "Harry",
              "imgurl": "cse_img/c.jfif",
              "playlistId": "PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR"
            },
            {
              "cardId": "CSEC02",
              "cardTitle": "Object Oriented Programing with C++",
              "desc": "This is a card related to programing language",
              "author": "Harry",
              "imgurl": "cse_img/cpp.jfif",
              "playlistId": "PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL"
            },
            {
              "cardId": "CSEC03",
              "cardTitle": "Object Oriented Programing with Java ",
              "desc": "This is a card related to programing language",
              "author": "Harry",
              "imgurl": "cse_img/java.png",
              "playlistId": "PLu0W_9lII9agS67Uits0UnJyrYiXhDS6q"
            },
            {
              "cardId": "CSEC04",
              "cardTitle": "Programing in Python",
              "desc": "This is a card related to programing language",
              "author": "Harry",
              "imgurl": "cse_img/python.jfif",
              "playlistId": "PLu0W_9lII9agICnT8t4iYVSZ3eykIAOME"
            }
          ]
        },
        {
          "itemid": "CSEI02",
          "noofcards": 3,
          "domain": "Database Management System",
          "cardlist": [
            {
              "cardId": "CSEC01",
              "cardTitle": "Database Management System",
              "desc": "This is a card related to database management",
              "author": "Varun Singla",
              "imgurl": "cse_img/dbms.png",
              "playlistId": "PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y"
            },
            {
              "cardId": "CSEC02",
              "cardTitle": "SQL",
              "desc": "This is a card related to database management",
              "author": "Manish Sharma",
              "imgurl": "cse_img/sql.png",
              "playlistId": "PLL_LQvNX4xKwbz1aJe0RofbT9YeJH9huQ"
            },
            {
              "cardId": "CSEC03",
              "cardTitle": "Pl/Sql",
              "desc": "This is a card related to database management",
              "author": "Manish Sharma",
              "imgurl": "cse_img/plsql.png",
              "playlistId": "PLL_LQvNX4xKyiExzq9GKwORoH6nvaRnOQ"
            }
          ]
        },
        {
          "itemid": "CSEI03",
          "noofcards": 1,
          "domain": "Data Structure And Algorith",
          "cardlist": [
            {
              "cardId": "CSEC01",
              "cardTitle": "Data Structure And Algorithm,",
              "desc": "This is a card related to data structure and algorithm",
              "author": "Abdul Bari",
              "imgurl": "cse_img/dsa.jfif",
              "playlistId": "PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O"
            }
          ]
        },
        {
          "itemid": "CSEI04",
          "noofcards": 2,
          "domain": "Development",
          "cardlist": [
            {
              "cardId": "CSEC01",
              "cardTitle": "Web Development",
              "desc": "This is a card related to development",
              "author": "Harry",
              "imgurl": "cse_img/web.jfif",
              "playlistId": "PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg"
            },
            {
              "cardId": "CSEC02",
              "cardTitle": "Android Development with Java",
              "desc": "This is a card related to development",
              "author": "Harry",
              "imgurl": "cse_img/android.jfif",
              "playlistId": "PLu0W_9lII9aiL0kysYlfSOUgY5rNlOhUd"
            }
          ]
        },
        {
          "itemid": "CSEI05",
          "noofcards": 3,
          "domain": "Artificial Intelligence",
          "cardlist": [
            {
              "cardId": "CSEC01",
              "cardTitle": "Fundamentals of AI",
              "desc": "This is a card related to artificial intelligence",
              "author": "Varun Singla",
              "imgurl": "cse_img/ai.jfif",
              "playlistId": "PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI"
            },
            {
              "cardId": "CSEC02",
              "cardTitle": "Machine Learning",
              "desc": "This is a card related to artificial intelligence",
              "author": "Harry",
              "imgurl": "cse_img/ml.jfif",
              "playlistId": "PLu0W_9lII9ai6fAMHp-acBmJONT7Y4BSG"
            },
            {
              "cardId": "CSEC03",
              "cardTitle": "Deep Learning",
              "desc": "This is a card related to artificial intelligence",
              "author": "Prof. Mitesh Khapra",
              "imgurl": "cse_img/deep.jfif",
              "playlistId": "PLyqSpQzTE6M9gCgajvQbc68Hk_JKGBAYT"
            },
            {
              "cardId": "CSEC04",
              "cardTitle": "Reinforcement Learning",
              "desc": "This is a card related to artificial intelligence",
              "author": "Prof. Balaraman Ravindran",
              "imgurl": "cse_img/rl.jfif",
              "playlistId": "PLEAYkSg4uSQ0Hkv_1LHlJtC_wqwVu6RQX"
            }
          ]
        },
        {
          "itemid": "CSEI06",
          "noofcards": 3,
          "domain": "System Design",
          "cardlist": [
            {
              "cardId": "CSEC01",
              "cardTitle": "Compiler Design",
              "desc": "This is a card related to system design",
              "author": "Varun Singla",
              "imgurl": "cse_img/cd.jfif",
              "playlistId": "PLxCzCOWd7aiEKtKSIHYusizkESC42diyc"
            },
            {
              "cardId": "CSEC02",
              "cardTitle": "Operating System",
              "desc": "This is a card related to system design",
              "author": "Varun Singla",
              "imgurl": "cse_img/os.jfif",
              "playlistId": "PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p"
            },
            {
              "cardId": "CSEC03",
              "cardTitle": "Computer Networks",
              "desc": "This is a card related to system design",
              "author": "Varun Singla",
              "imgurl": "cse_img/cn.jfif",
              "playlistId": "PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_"
            }
          ]
        },
        {
          "itemid": "CSEI07",
          "noofcards": 2,
          "domain": "Data Science",
          "cardlist": [
            {
              "cardId": "CSEC01",
              "cardTitle": "Python for Data Science ",
              "desc": "This is a card related to data science",
              "author": "NPTEL IITM",
              "imgurl": "cse_img/ds.jfif",
              "playlistId": "PLyqSpQzTE6M_fFg1zZmeGIkenMDgXKGYi"
            },
            {
              "cardId": "CSEC02",
              "cardTitle": "Data Science for Engineers",
              "desc": "This is a card related to data science",
              "author": "NPTEL IITM",
              "imgurl": "cse_img/dse.jfif",
              "playlistId": "PLyqSpQzTE6M-Rf2y3MT5aZ1UpTF1UQBK0"
            }
          ]
        },
        {
          "itemid": "CSEI08",
          "noofcards": 4,
          "domain": "Other Courses",
          "cardlist": [
            {
              "cardId": "CSEC01",
              "cardTitle": "Computer Architecture and Organization",
              "desc": "This is a card related to other courses",
              "author": "Varun Singla",
              "imgurl": "cse_img/coa.png",
              "playlistId": "PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX"
            },
            {
              "cardId": "CSEC02",
              "cardTitle": "Theory of Computation",
              "desc": "This is a card related to other courses",
              "author": "Varun Singla",
              "imgurl": "cse_img/toc.jfif",
              "playlistId": "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i"
            },
            {
              "cardId": "CSEC03",
              "cardTitle": "Software Engineering",
              "desc": "This is a card related to other courses",
              "author": "Varun Singla",
              "imgurl": "cse_img/se.jfif",
              "playlistId": "PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2"
            },
            {
              "cardId": "CSEC04",
              "cardTitle": "Microprocessor Architecture",
              "desc": "This is a card related to other courses",
              "author": "Tutorials Point",
              "imgurl": "cse_img/mpa.jfif",
              "playlistId": "PLWPirh4EWFpFDi8bggPYOiMLlD1D_bBPM"
            },
            {
              "cardId": "CSEC05",
              "cardTitle": "Computer Graphics",
              "desc": "This is a card related to other courses",
              "author": "Deepak Garg",
              "imgurl": "cse_img/cg.png",
              "playlistId": "PLL8qj6F8dGlScni_9ZmeOMoRodrwzhvTq"
            },
            {
              "cardId": "CSEC06",
              "cardTitle": "Digital Logic And Design",
              "desc": "This is a card related to other courses",
              "author": "Varun Singla",
              "imgurl": "cse_img/dld.jfif",
              "playlistId": "PLxCzCOWd7aiGmXg4NoX6R31AsC5LeCPHe"
            }
          ]
        }
      ]
  }];
module.exports = courses;