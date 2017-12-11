import React from 'react';
import SectionView from './sectionView';

export default class CourseModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var course = this.props.course;
    return (
      <div className="modal fade"
        id={"Modal" + this.props.modalId}
        tabIndex="-1" role="dialog"
        aria-labelledby={"Modal" + this.props.modalId}
        aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{course.subject + " " + course.number + ": " + course.name}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p><b>Hours:</b> {course.credit_hours}</p>
              <p>{course.description}</p>
              {
                course.gen_ed_categories.length > 0 ? (
                  <p>Satisfies the following general education categories:
                    {
                       course.gen_ed_categories.map(category => {
                         return (
                           <span key={category}>
                             <br/>
                             {category}
                           </span>
                         )
                       })
                    }
                  </p>
                ) : ''
              }
              <SectionView course={course} section={this.props.section}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
