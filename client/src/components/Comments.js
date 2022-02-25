import React, { useEffect, useState } from "react";
import { commentsByItineraryId } from "./../store/actions/commentActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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

let mappingComments =
    commentsData &&
    commentsData
      /* .filter((x) => x.itineraryId === props.itineraryId) */
      .map((y) => {
        return (
          <div>
            <p> {y.text}</p>
          </div>
        );
      }); 

  return (
    <div class="container my-5 py-5 text-dark">
      <div class="row d-flex justify-content-center">
        <div class="col-md-11 col-lg-9 col-xl-7">
          <div class="d-flex flex-start mb-4">
            <img
              class="rounded-circle shadow-1-strong me-3"
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
              alt="avatar"
              width="65"
              height="65"
            />
            <div class="card w-100">
              <div class="card-body p-4">
                <div class="">
                  <h5>Johny Cash</h5>
                  <p class="small">3 hours ago</p>
                  <p>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                    scelerisque ante sollicitudin. Cras purus odio, vestibulum
                    in vulputate at, tempus viverra turpis. Fusce condimentum
                    nunc ac nisi vulputate fringilla. Donec lacinia congue felis
                    in faucibus ras purus odio, vestibulum in vulputate at,
                    tempus viverra turpis.
                  </p>

                  <div class="d-flex justify-content-between align-items-center"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex flex-start">
           {mappingComments}
            </div>
        </div>
      </div>
    </div>
  );
}

export { Comments };
