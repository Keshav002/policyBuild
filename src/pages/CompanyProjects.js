import React from 'react'
import Nav from '.././components/Nav'
import PolicyCard from '.././components/PolicyCard'
import "./CompanyProjects.css"
function CompanyProjects() {
  return (
    <>
    <Nav/>
    <div className='policy-card-div'>
    <div className='consultant-projects-page'>
    <div className='consultant-projects-page-cards'>
    <PolicyCard/>
    <PolicyCard/>
    <PolicyCard/>
    <PolicyCard/>
    <PolicyCard/>
    <PolicyCard/>
    </div>
    </div>
    </div>
    </>
  )
}

export default CompanyProjects