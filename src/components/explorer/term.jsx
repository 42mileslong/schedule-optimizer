import React from 'react';
import Subject from './subject';


export default class Term extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termData: props.termData
    };
  }

  render() {
    var subjects = this.state.termData.subjects;
    return (
      <div className="container-fluid">
        <h4 className="h2">{this.state.termData.name}</h4>
        <div className="card">
          <div class="card-body">
          <h5 className="card-title text-center">Subjects of Instruction</h5>
            <div className="row">
            {
              subjects.map(data=> {
                return (
                  <div className="col-3">
                    <Subject
                      key={"course_" + data.name}
                      subjectData={data} />
                  </div>
                )
              })
            }
            </div>
          </div>
        </div>
      </div>
    );

  }
}
