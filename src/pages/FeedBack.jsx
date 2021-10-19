import React from 'react'
import Helmet from '../components/Helmet'
import FormFeedback from '../components/FormFeedback'
import Feedback from '../components/FeedbackPage'

const FeedBack = () => {
  return (
    <Helmet title="Feedback">
      <>
        <h1 className="feedback-title">
          Give Us A Feedback
        </h1>
        <div className="notFound-instruct">
          <div className="title">
          Why you must to feedback ? <i className='bx bx-help-circle'></i>
          </div>
          Leaving feedback will make us improve our ability to create websites, and your feedback will be scores for our final project at PT Sampulkreativ
        </div>
        <FormFeedback />
        <div className="feedback-items">
          <div className="recommend-title">
            This is What People Say
          </div>
          <Feedback />
        </div>
      </>
    </Helmet>
  )
}

export default FeedBack
