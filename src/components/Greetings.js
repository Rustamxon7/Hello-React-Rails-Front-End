import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGreetings } from '../redux/greetings/data';

function Greeting() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGreetings());
  }, [dispatch]);

  const greetings = useSelector((state) => state.greetings.data);
  const loading = useSelector((state) => state.greetings.loading);

  return (
    <div>
      <h1>Greetings</h1>
      <div>
        {loading && <p>Loading...</p>}
        {greetings.message}
      </div>
    </div>
  );
}

export default Greeting;
