import React, { useEffect, useState } from "react";
import { commentsByItineraryId } from "./../store/actions/commentActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from 'moment'

function Comments(props) {
  const commentsData = useSelector((state) => state.comments.allComments);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadComments = async (itineraryIdToCheck) => {
      await dispatch(commentsByItineraryId(itineraryIdToCheck));
    };
    loadComments(props.itineraryId);
  }, [dispatch]);

  console.log("commentsData", commentsData);


  function capitalLetters(string){
    const words = string.split(" ");
   return words.map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join(" ");

  }


  function convertToDate(timestamp){

 
      const m = moment(timestamp)
      const minutes = moment(timestamp).minute();
      const hours =moment(timestamp).hours()
   
      const month = m.format('MMMM');
      const day   = m.format('D');
      const year  = m.format('YYYY');
      const date = moment(timestamp).format('MMMM Do YYYY')
      const fromNow = m.fromNow(); 


   const dateObject = {
      minutes: minutes,
      hours: hours,
      day: day,
      month: month,
      year: year,
      fromNow: fromNow,
    }
    return dateObject
  }

let mappingComments =
    commentsData &&
    commentsData
      /* .filter((x) => x.itineraryId === props.itineraryId) */
      .map((y) => {
        const date = convertToDate(y.timestamp)
        

        const name = capitalLetters(y.userName)
     
          return (
            <div class="d-flex flex-row p-3">
              <img
                src={y.profilePicture}
                width="40"
                height="40"
                class="rounded-circle mr-3"
              />
              <div class="w-100">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex flex-row align-items-center">
                    <span class="mr-2">{name}</span>
                  </div>{" "}
                  <small>{date.fromNow} </small>
                  <small>Date: {date.day} of {date.month} {date.year} - at {date.hours}: {date.minutes}h </small>
                </div>
                <p class="text-justify comment-text mb-0">{y.text}</p>
              </div>
            </div>
          );
      }); 

    
    

  return (
    <div class="container mt-5 mb-5">
    <div class="row height d-flex justify-content-center align-items-center">
        <div class="col-md-7">
            <div class="card">
                <div class="p-3">
                    <h6>Comments</h6>
                </div>

                <div class="mt-3 d-flex flex-row align-items-center p-3 form-color"> 
                  <img src="https://i.imgur.com/zQZSWrt.jpg" width="50" class="rounded-circle mr-2"/>
                   <input type="text" class="form-control" placeholder="Enter your comment..."/>  
                </div>

                <div class="mt-2">
                {mappingComments}

                   
                </div>
            </div>
        </div>
    </div>
</div>
  );
}

export { Comments };
