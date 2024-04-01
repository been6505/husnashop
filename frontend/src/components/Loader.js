/* REACT BOOTSTRAP */
import Spinner from "react-bootstrap/Spinner";

export default function Loader() {
  return (
    <div className="text-center">
      <h4>Loading...</h4>
      <Spinner
        animation="border"
        role="status"
        style={{
          height: "100px",
          width: "100px",
          margin: "auto",
          display: "block",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
