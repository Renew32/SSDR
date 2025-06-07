import myPdf from "./completion.pdf";

function Completion(props) {
  return <div
            style={{
              position: "fixed",   // REMPLIT la fenêtre, au-dessus du reste
              inset: 0,            // top:0 right:0 bottom:0 left:0
              margin: 0,
              zIndex: 50,          // s’il y a d’autres layouts
            }}
          >
            <iframe
              src={myPdf}
              title="Completion PDF"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>;
}

export default Completion;
