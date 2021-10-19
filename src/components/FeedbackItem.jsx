import React from 'react'
import { formatDate } from '../assets/utils/utils';

const FeedbackItem = (props) => {
  return (
    <div className="feedbackItem">
      <div className="feedbackItem-title">{props.title}</div>
      <div className="feedbackItem-date">{formatDate(props.created_at)}</div>
      <p className="feedbackItem-review">
        {props.review}
      </p>
      <div className="feedbackItem-name">
        - {props.name}
      </div>
    </div>
  )
}

export default FeedbackItem
