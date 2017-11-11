import React from 'react'
import ListViewItem from './listViewItem';
export default class GridView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="row">
        <div className="list-group col-12">
          {
            this.props.courses.map(course => {
              return (
                <ListViewItem course={course} />
              )

            })
          }
          </div>
      </div>
    )

  }
}
