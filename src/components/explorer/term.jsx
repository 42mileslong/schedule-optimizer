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
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{this.state.termData.name}</h4>
          <ul className="list-group">
          {
            this.state.termData.subjects.map(data=> {
              return (
                <Subject
                  key={"course_" + data.name}
                  subjectData={data} />
              )
            })
          }
          </ul>
        </div>
      </div>
    );

  }
}
