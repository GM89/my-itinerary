import React, { useEffect, useState } from "react";
import { commentsByItineraryId } from "./../store/actions/commentActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { YahooLoginButton } from "react-social-login-buttons";

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


  function convertToDate(stringTime){
   const date = new Date(stringTime)

   const monthName = date.toLocaleString('default', { month: 'long' });
    const timeUTC = date.getTime()
    const minutes = date.getUTCMinutes()
    const hours = date.getUTCHours()
    const day = date.getUTCDate()
    const month = date.getUTCMonth()
    const year = date.getFullYear()
   const dateObject = {
      minutes: minutes,
      hours: hours,
      day: day,
      month: month,
      monthName: monthName,
      year: year,

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
                  <small></small>
                </div>
                <p class="text-justify comment-text mb-0">Date: {date.day} of {date.monthName} {date.year}</p>
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

                    <div class="d-flex flex-row p-3"> 
                        <img src="https://i.imgur.com/3J8lTLm.jpg" width="40" height="40" class="rounded-circle mr-3"/>
                        <div class="w-100">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex flex-row align-items-center">
                                 <span class="mr-2">Seltos Majito</span>
                                 <small class="c-badge">Top Comment</small> 
                                 </div> 
                                 <small>2h ago</small>
                            </div>
                            <p class="text-justify comment-text mb-0">Tellus in hac habitasse platea dictumst vestibulum. Lectus nulla at volutpat diam ut venenatis tellus. Aliquam etiam erat velit scelerisque in dictum non consectetur. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra. Aliquam faucibus purus in massa.</p>
                            <div class="d-flex flex-row user-feed"> 
                              <span class="wish"> <i class="fa fa-heartbeat mr-2"></i>14</span> <span class="ml-3"><i class="fa fa-comments-o mr-2"></i>Reply</span> 
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-row p-3"> 
                    <img src="https://i.imgur.com/agRGhBc.jpg" width="40" height="40" class="rounded-circle mr-3"/>
                        <div class="w-100">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex flex-row align-items-center"> <span class="mr-2">Maria Santola</span> <small class="c-badge">Top Comment</small> </div> <small>12h ago</small>
                            </div>
                            <p class="text-justify comment-text mb-0"> Id eu nisl nunc mi ipsum faucibus. im veniam</p>
                            <div class="d-flex flex-row user-feed"> <span class="wish"><i class="fa fa-heartbeat mr-2"></i>54</span> <span class="ml-3"><i class="fa fa-comments-o mr-2"></i>Reply</span> </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>
  );
}

export { Comments };
