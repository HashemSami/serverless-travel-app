import React, { Fragment, useState } from 'react';
import './UploadImagePage.styles.scss';
import TripCard from '../../components/trips/trips-components/TripCard';
import ImageUpload from '../../components/image-upload/ImageUpload';
import { getUserId } from '../../utils/helperFunctions';
import Note from '../../components/note/Note';

const UploadImagePage = ({ auth, trips, location }) => {
  const { tripId, userId } = location.state;
  const tokenId = getUserId(auth.idToken);
  const tripData = trips.find((trip) => trip.tripId === tripId);

  const [tripInfo, setTripInfo] = useState([tripData]);
  const [mainNote, setMainNote] = useState('');
  if (auth.isAuthenticated() && userId === tokenId) {
    return (
      <Fragment>
        <main>
          <Note mainNote={mainNote} setMainNote={setMainNote} />
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
        </main>
      </Fragment>
    );
  }
};

export default UploadImagePage;
