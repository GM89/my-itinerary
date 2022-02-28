import React, { useEffect, useState } from "react";
import { commentsByItineraryId , commentsPostByItinerary} from "./../store/actions/commentActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { withSetStateAllowed } from "enzyme/build/Utils";

function Comments(props) {
  const [newCommentState, setComment] = useState({
    itineraryId: "",
    text: [],
    memberId: "",
    timestamp: "",
    profilePicture: "",
    userName: "",
    city: "",
  });

  const commentsData = useSelector((state) => state.comments.allComments);
  const authenticatedUser = useSelector((state) => state.members.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadComments = async (itineraryIdToCheck) => {
      await dispatch(commentsByItineraryId(itineraryIdToCheck));
    };
    loadComments(props.itineraryId);
  }, [dispatch]);

  console.log("commentsData", commentsData);

  function capitalLetters(string) {
    const words = string.split(" ");
    return words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");
  }

  function convertToDate(timestamp) {
    const m = moment(timestamp);
    const minutes = moment(timestamp).minute();
    const hours = moment(timestamp).hours();
    const month = m.format("MMMM");
    const day = m.format("D");
    const year = m.format("YYYY");
    const date = moment(timestamp).format("MMMM Do YYYY");
    const fromNow = m.fromNow();
    const dateObject = {
      minutes: minutes,
      hours: hours,
      day: day,
      month: month,
      year: year,
      fromNow: fromNow,
    };
    return dateObject;
  }

  async function newComment(event) {
    event.preventDefault();

    const CurrentDate = moment().toISOString();

    
    const commentObject = ({
      itineraryId: props.itineraryId,
      text: [newCommentState],
      memberId: authenticatedUser._id,
      timestamp: CurrentDate,
      profilePicture: authenticatedUser.profilePicture,
      userName: authenticatedUser.userName,
      city: props.city,
    });
    console.log("comentario objecto", commentObject)
   dispatch(commentsPostByItinerary(commentObject))



  console.log("newcomment state", newCommentState)
  }


  let mappingComments =
    commentsData &&
    commentsData
      .filter((x) => x.itineraryId === props.itineraryId)
      .map((y) => {
        const date = convertToDate(y.timestamp);
        const name = capitalLetters(y.userName);
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
                <small>
                  Date: {date.day} of {date.month} {date.year} - at {date.hours}
                  : {date.minutes}h{" "}
                </small>
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

              <img
                src={authenticatedUser.profilePicture}
                width="50"
                class="rounded-circle mr-2"
              />
                <form onSubmit={(e) => newComment(e)}>
                <div class="d-flex justify-content-center">
                  <input id="input-comments"
                      type="text"
                      class="form-control"
                      placeholder="Enter your comment..."
                      onChange={(e) =>
                        setComment((x) => ({
                          ...x,
                          text: e.target.value,
                        }))}
                    />   
                       <button id="submit-button-comments" type="submit">                
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                        </svg>
                      </button> 
                      </div>
                </form>
                     
            </div>

            <div class="mt-2">{mappingComments}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Comments };
//mt margin top . p- 3 padding3