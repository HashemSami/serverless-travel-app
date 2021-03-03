import React, { Fragment, useState } from 'react';
import './UploadImagePage.styles.scss';
import TripCard from '../../components/trips/trips-components/TripCard';
import ImageUpload from '../../components/image-upload/ImageUpload';
import { getUserId } from '../../utils/helperFunctions';

const UploadImagePage = ({ auth, trips, location, setMainNote }) => {
  const { tripId, userId } = location.state;
  const tokenId = getUserId(auth.idToken);
  const tripData = trips.find((trip) => trip.tripId === tripId);

  const [tripInfo, setTripInfo] = useState([tripData]);
  console.log(tripInfo);
  if (auth.isAuthenticated() && userId === tokenId) {
    //   console.log(auth.idToken);
    // console.log(getUserId(auth.idToken));

    return (
      <Fragment>
        <div id="result">
          <TripCard
            trips={tripInfo}
            auth={auth}
            setMainNote={setMainNote}
            forImageUpdate={true}
          />
        </div>

        <ImageUpload
          auth={auth}
          tripId={tripId}
          setMainNote={setMainNote}
          setTripInfo={setTripInfo}
        />
      </Fragment>
    );
  }
};

export default UploadImagePage;
