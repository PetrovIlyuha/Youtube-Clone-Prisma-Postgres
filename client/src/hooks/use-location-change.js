import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function usePrevious(value) {
  const locationRef = useRef(null);
  useEffect(() => {
    locationRef.current = value;
  }, [value]);
  return locationRef.current;
}

export function useLocationChange(callback) {
  const location = useLocation();
  const prevLocation = usePrevious(location);
  useEffect(() => {
    if (prevLocation?.pathname !== location.pathname) {
      callback();
    }
  }, [location, prevLocation, callback]);
}
