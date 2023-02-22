import '../App.css'

function NewsSection() {
    return (
      <div className="col-12 col-lg-6">
        <header className="mt-2 p-4 text-white text-center rounded" style={{backgroundColor:'#84B9F9'}}>
          <h1 > Latest News </h1>
        </header>
        <ul>
          <li className="page_li">
            <p>Upcoming Seminar</p>
            <p>There will be a seminar in three days discussing multiple career opportunities</p>
          </li>
          <li className="page_li">
            <p>Recent Event</p>
            <p>Here are the highlights from the last major PRSSA Event</p>
          </li>
          <li className="page_li">
            <p>Guest Appearance This Month!</p>
            <p>We have a very special guest appearing to give a talk later this month. Mark your calendars!</p>
          </li>
        </ul>
      </div>
    );
  }
  export default NewsSection