import React from 'react'
import Nav from '.././components/Nav'
import PolicyCard from '.././components/PolicyCard'
import "./ConsultantProjects.css"
function ConsultantProjects() {
  return (
    <>
    <Nav/>
    <div className='policy-card-div'>
    <PolicyCard/>
    <PolicyCard/>
    <PolicyCard/>
    <PolicyCard/>
    <PolicyCard/>
    <PolicyCard/>
    </div>
    </>
  )
}

export default ConsultantProjects