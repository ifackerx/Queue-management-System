import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { Icon, Button, Row, Col, Modal } from "antd";
import styled from "styled-components";


const BodyTable = styled.div`
  color: white;
`;

const { confirm } = Modal;
// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

const showDeleteConfirm = id => {
  confirm({
    title: "Are you sure delete this task?",
    // content: "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      console.log("OK");
      console.log(id);
      axios.delete("http://localhost:8080/queue/delete/" + id, {}).then(res => {
        console.log(res);
        console.log(res.data);
      });
    },
    onCancel() {
      console.log("Cancel");
    }
  });
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  console.log(list[startIndex].id);
  console.log(list[endIndex].id);

  return result;
};

const grid = 10;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer

  // change background colour if dragging

  // styles we need to apply on draggables
  background: isDragging ? "rgb(109, 109, 109)" : "rgb(41, 41, 41)",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  margin: 5,
  margin: `0 0 ${grid}px 0`
});

const App = props => {
  const [itemsReOrder, setItemsReOrder] = useState([]);
  const [items, setItems] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/queue")
      .then(response => {
        var resData = response.data;
        setItems(resData);
      })
      .catch(error => {
        console.log(error);
      });
  }, [items]);

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    console.log("Result : " + result);
    itemsReOrder.map((i, index) =>
      axios
        .patch("http://localhost:8080/queue/update/" + i._id, {
          queue_date: i.queue_date,
          queue_name: i.queue_name,
          queue_about: i.queue_about,
          queue_create: i.queue_create,
          queue_priority: i.queue_priority,
          __v: i.__v
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
          console.log(i.queue_name);
        })
    );

    const listItem = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    console.log(listItem);
    setItemsReOrder(listItem);
    console.log(items);
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <div>
      <BodyTable>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppableId">
          {(provided, snapshot) => (
            <div
              className=" container text-center p-0"
              id="corner"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Row className="rowHeader m-0 p-0 ">
                <Col span={7} className="col-3 mb-3 mt-3">
                  ลำดับ
                </Col>
                <Col span={7} className="col-9 text-left mt-3">
                  หัวข้อ
                </Col>
                <Col span={7} className="col-9 text-left mt-3">
                  วันที่
                </Col>
                <Col span={3} className="col-9 text-left mt-3"></Col>
              </Row>
              {items.map((item, index) => (
                <Draggable
                  key={String(item._id)}
                  draggableId={String(item._id)}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className="m-0 p-0"
                      id="rowHover"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Row className="table-dnd">
                        <Col span={7} className="col-3 mb-3 mt-3">
                          {index + 1}
                        </Col>
                        <Col span={7} className="col-7 text-left mb-3 mt-3">
                          {item.queue_name}
                        </Col>
                        <Col span={7} className="col-7 text-left mb-3 mt-3">
                          {item.queue_date}
                        </Col>
                        <Col span={12} className="col-2 text-left mb-3 mt-3 ">
                          <Button
                            type="danger"
                            shape="circle"
                            icon="delete"
                            onClick={() => showDeleteConfirm(item._id)}
                          />
                        </Col>
                      </Row>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </BodyTable>
    </div>

  );
};

export default App;
