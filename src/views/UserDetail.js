import React from 'react';
import '../App.css';
import fetchGraphQL from '../fetchGraphQL';

const { useState, useEffect } = React;
// EXPLORER: https://docs.github.com/en/graphql/overview/explorer

function UserDetail() {
  // We'll load the name of a repository, initially setting it to null
  const [repositories, setRepositories] = useState(null);

  // When the component mounts we'll fetch a repository name
  useEffect(() => {
    let isMounted = true;
    fetchGraphQL(`
      query userDetailQuery {
        user(login: "gemmiedodger") {
          repositories(last: 50) {
            nodes {
              name
              createdAt
              primaryLanguage {
                name
              }
              collaborators {
                totalCount
              }
            }
          }
        }
      }
    `).then(response => {
      // Avoid updating state if the component unmounted before the fetch completes
      if (!isMounted) {
        return;
      }
      const data = response.data;
      console.log(data)
      setRepositories(data.user);
 
    }).catch(error => {
      console.error(error);
    });
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Render "Loading" until the query completes
  if(repositories !== null) {
  return (
    <div className="Repository">
      <h1>Your Repository Data</h1>
      {repositories.repositories.nodes.forEach((repository) => {
        Object.keys(repository).map(key => {
          const value = repository[key];
          
          console.log( key + " " + value)
          return (
             <p>{value != null ? `${key}: ${value}` : ''}</p>
             );
          })
        })
       }
     </div>
  );
} else {
  return (<div className="App">
    <h5>Loading</h5>
  </div>
  )
}
}

export default UserDetail;