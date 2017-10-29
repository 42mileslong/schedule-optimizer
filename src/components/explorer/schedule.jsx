import React from 'react';
import Term from './term';

var fakeScheduleData = [
  {
    name: "2017",
    terms: [
      {
        name: "Spring 2017",
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
      terms: []
    }
  }
  render() {
    return (
      <div className="container schedule">
        <h1>Schedule</h1>
        {
          this.state.scheduleData[0].terms.map(data => {
            return (
              <Term key={"term_" + data.name} termData={data} />
            )
          })
        }
      </div>
    );
  }
}
