import "../css/notFound.css";



function Component404(){
    return (
            <div className="not-found">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Sorry, but the page you were trying to view does not exist.</p>
            </div>
    )
}

export function NotFound() {
	return <div className={"not-found-wrapper"}>
        <Component404/>
    </div>;
}
