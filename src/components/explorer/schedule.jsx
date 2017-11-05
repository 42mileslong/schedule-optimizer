import React from 'react';
import Term from './term';
import Filter from './filter/filter';
import CourseList from './courseList/courseList';

var fakeScheduleData = [
  {
    name: "2017",
    terms: [
      {
        name: "Spring",
        subjects: [
          {
            name: "Antropology",
            code: "ANTRO",
            courses: [
              {
                number: "101",
                name: "Introduction to Antropology",
                description: "Some bullshit about antropology",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              },
              {
                number: "102",
                name: "Introduction to Antropology",
                description: "Some more bullshit about antropology",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Computer Science",
            code: "CS",
            courses: [

              {
                number: "101",
                name: "Introduction to Computer Science",
                description: "Some bullshit about computer science",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              },
              {
                number: "102",
                name: "Introduction to Computer Science",
                description: "Some more bullshit about computer science",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              }

            ]

          },
          {
            name: "Mathematics",
            code: "MATH",
            courses: [

              {
                number: "101",
                name: "Introduction to Mathematics",
                description: "Some bullshit about mathematics",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              },
              {
                number: "102",
                name: "Introduction to mathematics",
                description: "Some more bullshit about mathematics",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              }

            ]

          },
          {
            name: "Basket Weaving",
            code: "BW",
            courses: [

              {
                number: "101",
                name: "Introduction to Basket Weaving",
                description: "Some bullshit about Basket Weaving",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              },
              {
                number: "102",
                name: "Introduction to Basket Weaving",
                description: "Some more bullshit about Basket Weaving",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              }

            ]

          }, {
            name: "Astronomy",
            code: "ANTRO",
            courses: [
              {
                number: "101",
                name: "Introduction to Astronomy",
                description: "Some bullshit about astronomy",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              },
              {
                number: "102",
                name: "Introduction to astronomy",
                description: "Some more bullshit about astronomy",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Physics",
            code: "PHYS",
            courses: [
              {
                number: "101",
                name: "Introduction to physics",
                description: "Some bullshit about physics",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              },
              {
                number: "102",
                name: "Introduction to physics",
                description: "Some more bullshit about physics",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Aerospace",
            code: "AERO",
            courses: [
              {
                number: "101",
                name: "Introduction to aerospace",
                description: "Some bullshit about aerospace",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              },
              {
                number: "102",
                name: "Introduction to aerospace",
                description: "Some more bullshit about aerospace",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              }
            ]
          }

        ]
      },
      {
        name: "Fall",
        subjects: [
          {
            name: "Antropology",
            code: "ANTRO",
            courses: [
              {
                number: "101",
                name: "Introduction to Antropology",
                description: "Some bullshit about antropology",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              },
              {
                number: "102",
                name: "Introduction to Antropology",
                description: "Some more bullshit about antropology",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Computer Science",
            code: "CS",
            courses: [

              {
                number: "101",
                name: "Introduction to Computer Science",
                description: "Some bullshit about computer science",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              },
              {
                number: "102",
                name: "Introduction to Computer Science",
                description: "Some more bullshit about computer science",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              }

            ]

          },
          {
            name: "Mathematics",
            code: "MATH",
            courses: [

              {
                number: "101",
                name: "Introduction to Mathematics",
                description: "Some bullshit about mathematics",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              },
              {
                number: "102",
                name: "Introduction to mathematics",
                description: "Some more bullshit about mathematics",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              }

            ]

          },
          {
            name: "Basket Weaving",
            code: "BW",
            courses: [

              {
                number: "101",
                name: "Introduction to Basket Weaving",
                description: "Some bullshit about Basket Weaving",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              },
              {
                number: "102",
                name: "Introduction to Basket Weaving",
                description: "Some more bullshit about Basket Weaving",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              }

            ]

          }, {
            name: "Astronomy",
            code: "ANTRO",
            courses: [
              {
                number: "101",
                name: "Introduction to Astronomy",
                description: "Some bullshit about astronomy",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              },
              {
                number: "102",
                name: "Introduction to astronomy",
                description: "Some more bullshit about astronomy",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Physics",
            code: "PHYS",
            courses: [
              {
                number: "101",
                name: "Introduction to physics",
                description: "Some bullshit about physics",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              },
              {
                number: "102",
                name: "Introduction to physics",
                description: "Some more bullshit about physics",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Aerospace",
            code: "AERO",
            courses: [
              {
                number: "101",
                name: "Introduction to aerospace",
                description: "Some bullshit about aerospace",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              },
              {
                number: "102",
                name: "Introduction to aerospace",
                description: "Some more bullshit about aerospace",
                sections: [
                  {
                    code:"A",
                    end_date:"2017-01-13-06:00",
                    start_date:"2017-01-13-06:00",
                    number:"10003",
                    meetings:[
                      {
                        "building": "David Kinley Hall",
                        "days": "MTRF",
                        "end_time": "11:50 AM",
                        "instructors": [
                          {
                            "first_name": "M",
                            "last_name": "Benoit"
                          },
                          {
                            "first_name": "A",
                            "last_name": "Ghaderi"
                          }
                        ],
                        "room": "206",
                        "start_time": "08:00 AM",
                        "type": "LCD",
                        "type_verbose": "Lecture-Discussion"
                      }
                    ]
                  }
                ]
              }
            ]
          }

        ]
      }
    ]

  }
];

export default class Schedule extends React.Component {
  constructor() {
    super()
    this.state = {
      scheduleData: fakeScheduleData,
      terms: [],
      searchCriteria: {
        avalibility: [],
        subjects: []
      },
      coursesToDisplay: []
    }
    this.updateSearchCriteria = this.updateSearchCriteria.bind(this);
  }

  updateSearchCriteria(searchCriteria) {
    var allCourses = [];
    console.log(searchCriteria);
    this.state.scheduleData[0].terms[0].subjects.forEach(subject => {
      //  Add dept info to course.
      var subjectName = subject.name;
      var subjectCode = subject.code;

      subject.courses.forEach(course => {
        course.subject = subjectName;
        course.code = subjectCode;
        allCourses.push(course);
      });
    });
    var filteredCourses = allCourses.filter(course => {
      //  Filter by Subject
      var index = searchCriteria.subjects.indexOf(course.subject);
      if (index  == -1) {
        return false;
      }
      return true;
    });
    this.setState({
      searchCriteria: searchCriteria,
      coursesToDisplay: filteredCourses
    });
  }

  render() {

    return (
      <div className="container-fluid schedule">
        <h1>Schedule</h1>
        <div className="row">


        </div>
        <div className="row">
          <Filter
            searchCriteria={this.state.searchCriteria}
            scheduleData={this.state.scheduleData}
            onChange={this.updateSearchCriteria}/>
          <CourseList
            courses={this.state.coursesToDisplay}
            />
        </div>
      </div>
    );
  }
}
