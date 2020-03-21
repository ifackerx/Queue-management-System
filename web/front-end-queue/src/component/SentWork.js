import React, { useState, useEffect } from "react";
import { Form, Container } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import moment from "moment";
import {
  Rate,
  Input,
  Col,
  Row,
  Icon,
  Select,
  DatePicker,
  Button,
  Modal
} from "antd";

const { confirm, success } = Modal;

const Wrapper = styled.div`
  padding: 2.5rem;
  margin: auto;
  width: 80%;
  background: rgb(41, 41, 41);
  text-algin: right;
  border-radius: 10px;
  color: white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

`;

const BottomSpace = styled.div`
  margin-bottom: 1rem;
`;

const BodyTable = styled.div`
`;


const { TextArea } = Input;
const { Option } = Select;

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

const SentWork = () => {
  const desc = ["น้อยมาก", "น้อย", "ปานกลาง", "สำคัญ", "สำคัญมาก"];
  const [rateValue, setRateValue] = useState();

  const [value, setValue] = useState();
  const [queName, setQueName] = useState();
  const [queAbout, setQueAbout] = useState();
  const [quePiority, setQuePiority] = useState();
  const [queCreate, setQueCreate] = useState();
  const [dateCurrent, setDateCurrent] = useState();

  useEffect(() => {
    var m = moment();
    setDateCurrent(m.format("YYYY-MM-DD hh:mm A"));
  }, []);

  const formSubmit = () => {
    confirm({
      title: "Do you confirm to create ?",
      onOk() {
        axios
          .post("http://localhost:8080/sentwork", {
            queue_date: dateCurrent,
            queue_name: queName,
            queue_about: queAbout,
            queue_create: queCreate,
            queue_priority: Number(quePiority)
          })
          .then(res => {
            success({
              content: "Success!"
            });

            console.log(res);
            console.log(res.data.errors);
          })
          .catch(error => {
            console.log("เออเร่อ" + " " + error);
          });
      },
      onCancel() {
        console.log("Cancel");
      }
    });

    console.log("you press from");

    console.log(queName);
    console.log(queAbout);
    console.log(queCreate);
    console.log(quePiority);
    console.log(dateCurrent);
  };

  function onChangeDate(date, dateString) {
    console.log(dateCurrent);
  }

  const handleChange = value => {
    console.log(value);
    setRateValue(value);
  };

  return (
    <div>
      <Container>
        <BottomSpace />
        <BodyTable>
        <Wrapper>
          <form>
            <Row>
              <Col span={6}>Queue Name :</Col>
              <Col span={12}>
                <Input
                  placeholder="Queue Name"
                  onChange={e => {
                    setQueName(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <BottomSpace />

            <BottomSpace />

            <Row>
              <Col span={6}>Date :</Col>
              <Col span={12}>
                <DatePicker onChange={onChangeDate} />
              </Col>
            </Row>
            <BottomSpace />
            <Row>
              <Col span={6}>Priority :</Col>
              <Col span={12}>
                <span>
                  <Rate
                    tooltips={desc}
                    onChange={value => setValue(value)}
                    value={value}
                  />
                  {value ? (
                    <span className="ant-rate-text">{desc[value - 1]}</span>
                  ) : (
                    ""
                  )}
                </span>
              </Col>
            </Row>

            <BottomSpace />

            <Row>
              <Col span={6}>Position :</Col>
              <Col span={12}>
                <Select
                  onChange={value => {
                    setQueCreate(value);
                  }}
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a Position"
                  optionFilterProp="children"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="Customer">Customer</Option>
                  <Option value="Excutive">Excutive</Option>
                  <Option value="Insider">Insider</Option>
                  <Option value="Outsider">Outsider</Option>
                </Select>
              </Col>
            </Row>
            <BottomSpace />
            <Row>
              <Col span={6}>Detail :</Col>
              <Col span={12}>
                <TextArea
                  placeholder="Detail of your task..."
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  style={{ width: 400 }}
                  onChange={e => {
                    setQueAbout(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <BottomSpace />

            <Row>
              <Col span={6}></Col>
              <Col span={12}>
                <Button type="primary" onClick={formSubmit}>
                  Sumbit
                </Button>
              </Col>
            </Row>
          </form>
        </Wrapper>
        <BottomSpace />
        </BodyTable>
      </Container>
    </div>
  );
};

export default SentWork;
