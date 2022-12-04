import React from 'react'


const About = () => {
  return (
    <>

      <main className='w-100'>
        <h2 className="featurette-heading fw-normal lh-1 text-center">Features of this<span className="text-muted"> iNotebook App</span> includes:</h2>
        

        <div className="container marketing mt-5">

          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">

              <img src="https://i.ibb.co/pWzyqJH/create-new.png" className="img-fluid w-25" alt="create" />

              <h2 className="fw-normal">Create</h2>
              <p>With this iNotebook app you can create a note or a todo list on your own after logging in to your account</p>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">

              <img src="https://i.ibb.co/fQRyGWW/read-new.png" className="img-fluid w-25" alt="create" />

              <h2 className="fw-normal">Read</h2>
              <p>With this iNotebook app you can fetch all of your notes or todo lists after logging in to your account</p>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">

              <img src="https://i.ibb.co/3WmGXnX/delete.png" className="img-fluid w-25" alt="create" />

              <h2 className="fw-normal">Delete</h2>
              <p>With this iNotebook app you can delete all of your notes or todo lists once you added them</p>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">

              <img src="https://i.ibb.co/gWXtKTJ/read-1.png" className="img-fluid w-25" alt="create" />

              <h2 className="fw-normal">Update</h2>
              <p>With this iNotebook app you can delete all of your notes or todo lists once you added them</p>
            </div>




          </div>




          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 col-xxl-12 my-auto">
              <h2 className="featurette-heading fw-normal lh-1">All your notes at one place<span className="text-muted"> and a better place to organize your to do lists</span></h2>
              <p className="lead">signup and create your todos to perform your tasks at right time </p>
            </div>
            <div className="col-md-5">
              <img src="https://i.ibb.co/K266CbX/signin.jpg" className="img-fluid" alt="create" />


            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 col-xxl-12 my-auto order-md-2 my-auto">
              <h2 className="featurette-heading fw-normal lh-1">Oh yeah, that's good. <span className="text-muted">See for yourself.</span></h2>
              <p className="lead">See all of yours notes and tasks once you login to your account</p>
            </div>
            <div className="col-md-5 order-md-1">

              <img src="https://i.ibb.co/hKCFWGx/login.jpg" className="img-fluid" alt="create" />
            </div>
          </div>

          <hr className="featurette-divider" />
        </div>

      </main>

    </>
  )
}

export default About
