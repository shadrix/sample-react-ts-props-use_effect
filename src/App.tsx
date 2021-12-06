import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';

interface IListItemProps {
  title: string;
  description: string;
  count: number;
}

const ListItem = (props: IListItemProps) => (
          <ListGroup.Item as="li"
                          className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                              <div className="fw-bold">{props.title}</div>
                              {props.description}
                            </div>
                          <Badge bg="primary" pill>
                              {props.count}
                          </Badge>
          </ListGroup.Item>
  );

interface IListProps {
    children: React.ReactNode;
}

const List = (props: IListProps) => (
  <ListGroup as="ol" numbered>
    {props.children}
  </ListGroup>
)

function sleep(ms : number) : Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function longOperation() : Promise<string> {
  const text = "Custom list";
  await sleep(2000);
  return text;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState('');

  // Similar to componentDidMount:
  useEffect(() => {

    async function init() {
      const result = await longOperation();
      setHeader(result);
      setLoading(false);
    }

    init();
  }, []);

  return (
    <Container className="p-3">
      <Container className="pb-1 p-5 mb-4 bg-light rounded-3">
        {loading && <span>Loading...</span>
        }
        {loading 
                ? <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                :
                <>
                  <h1 className="header">{header}</h1>
                  <List>
                    <ListItem title="bla bla" description="moo noo loo" count={4}  />
                    <ListItem title="bla bla" description="moo noo loo" count={4}  />
                    <ListItem title="bla bla" description="moo noo loo" count={4}  />
                    <ListItem title="bla bla" description="moo noo loo" count={4}  />
                    <ListItem title="bla bla" description="moo noo loo" count={4}  />
                    <ListItem title="bla bla" description="moo noo loo" count={4}  />
                    <ListItem title="bla bla" description="moo noo loo" count={4}  />
                  </List>
                </>
        }
        
      </Container>
    </Container>
  );
}


export default App;
