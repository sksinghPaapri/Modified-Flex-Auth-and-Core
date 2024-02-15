import _config from "./config.json";
import { React, useState, useEffect } from "react";
import {
  Container,
  Button,
  Col,
  Row,
  DropdownButton,
  Dropdown,
  ButtonGroup,
  Breadcrumb,
} from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ApiService from "../../helpers/ApiServices";
import { errorMessage } from "../../helpers/Utils";
import AppContentBody from "../../flex/flexBuilder/AppContentBody";
import AppContentForm from "../../flex/flexBuilder/AppContentForm";
import AppContentHeader from "../../flex/flexBuilder/AppContentHeader";
import AppLoader from "../../flex/flexComponent/AppLoader";
import SelectField from "../../flex/flexField/SelectField";
import TextField from "../../flex/flexField/TextField";
import TextArea from "../../flex/flexField/TextArea";

export default function Class() {
  const [state, setState] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const rootPath = location?.pathname?.split("/")[1];
  const { id } = useParams();
  const isAddMode = !id;
  const [searchParams] = useSearchParams();
  const [loderStatus, setLoderStatus] = useState(null);
  const [show, setShow] = useState(false);

  const {
    register,
    control,
    reset,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "navigations",
  });

  const customList = [
    { id: 1, name: "AppNavigationLink" },
    { id: 2, name: "AppNavigationCategory" },
  ];

  // Functions

  const onSubmit = (formData) => {
    // convert array of navigations.navigationType and navigations.navigation into object
    const newData = {
      ...formData,
      navigations: formData.navigations.map((nav) => ({
        navigationType: nav.navigationType[0].name,
        navigation: nav.navigation[0].id,
      })),
    };
    // console.log("3", newData);
    // return isAddMode ? createDocument(formData) : updateDocument(id, formData);
    return isAddMode ? createDocument(newData) : updateDocument(id, newData);
  };

  const createDocument = (data) => {
    ApiService.setHeader();
    return ApiService.post(`${_config.api.relativeUrl}`, data)
      .then((response) => {
        if (response.data.isSuccess) {
          navigate(`/${rootPath}/${_config.appRoutes.baseUrl}/list`);
        }
      })
      .catch((e) => {
        console.log(e.response?.data.message);
        errorMessage(e, null);
      });
  };

  const updateDocument = (id, data) => {
    ApiService.setHeader();
    return ApiService.patch(`/${_config.api.relativeUrl}/${id}`, data)
      .then((response) => {
        console.log(response.data);
        if (response.data.isSuccess) {
          navigate(`/${rootPath}/${_config.appRoutes.baseUrl}/list`);
        }
      })
      .catch((e) => {
        console.log(e.response?.data.message);
        //errorMessage(e, dispatch)
      });
  };

  const deleteDocument = () => {
    ApiService.setHeader();
    return ApiService.delete(`/${_config.api.relativeUrl}/${id}`)
      .then((response) => {
        if (response.status == 204) {
          navigate(`/${rootPath}/${_config.appRoutes.baseUrl}/list`);
        }
      })
      .catch((e) => {
        console.log(e.response.data.message);
        //errorMessage(e, dispatch)
      });
  };

  const findOneDocument = () => {
    ApiService.setHeader();
    return ApiService.get(`/${_config.api.relativeUrl}/${id}`)
      .then((response) => {
        const document = response?.data.document;
        setState(document);
        reset(document);
        if (document.date) {
          setValue("date", document.date.split("T")[0]);
        }

        setLoderStatus("SUCCESS");
      })
      .catch((e) => {
        console.log(e.response?.data.message);
        errorMessage(e, null);
      });
  };

  useEffect(() => {
    if (!isAddMode) {
      setLoderStatus("RUNNING");
      findOneDocument();
    }
  }, []);

  if (loderStatus === "RUNNING") {
    return <AppLoader />;
  }

  return (
    <AppContentForm onSubmit={handleSubmit(onSubmit)}>
      <AppContentHeader>
        <Container fluid>
          <Row>
            <Col className="p-0 ps-2">
              <Breadcrumb
                style={{ fontSize: "24px", marginBottom: "0 !important" }}
              >
                <Breadcrumb.Item
                  className="breadcrumb-item"
                  linkAs={Link}
                  linkProps={{
                    to: `/${rootPath}/${_config.appRoutes.baseUrl}/list`,
                  }}
                >
                  {" "}
                  <div className="breadcrum-label">{_config.appName}</div>
                </Breadcrumb.Item>
                {isAddMode ? (
                  <Breadcrumb.Item active>NEW</Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item active>{state?.name}</Breadcrumb.Item>
                )}
              </Breadcrumb>
            </Col>
          </Row>
          <Row style={{ marginTop: "-10px" }}>
            <Col className="p-0 ps-1">
              <Button type="submit" variant="primary" size="sm">
                SAVE
              </Button>{" "}
              <Button
                as={Link}
                to={`/${rootPath}/${_config.appRoutes.baseUrl}/list`}
                variant="secondary"
                size="sm"
              >
                DISCARD
              </Button>
              {!isAddMode && (
                <DropdownButton
                  size="sm"
                  as={ButtonGroup}
                  variant="light"
                  title="ACTION"
                >
                  <Dropdown.Item onClick={deleteDocument} eventKey="4">
                    Delete
                  </Dropdown.Item>
                </DropdownButton>
              )}
            </Col>
          </Row>
        </Container>
      </AppContentHeader>
      <AppContentBody>
        {/* BODY FIELDS */}
        <Container fluid>
          <Row>
            <TextField
              register={register}
              errors={errors}
              field={{
                description: "Name",
                label: "NAME",
                fieldId: "name",
                placeholder: "",
                required: true,
                validationMessage: "Please enter the navigation center name!",
              }}
              changeHandler={null}
              blurHandler={null}
            />
            <TextField
              register={register}
              errors={errors}
              field={{
                description: "NavigationCenterId",
                label: "NAVIGATION CENTER ID",
                fieldId: "navigationCenterId",
                placeholder: "",
                required: true,
                validationMessage: "Please enter the navigation center id !",
              }}
              changeHandler={null}
              blurHandler={null}
            />
            <TextField
              register={register}
              errors={errors}
              field={{
                description: "BaseRoute",
                label: "BASE ROUTE",
                fieldId: "baseRoute",
                placeholder: "",
                required: true,
                validationMessage: "Please enter the baseroute!",
              }}
              changeHandler={null}
              blurHandler={null}
            />
            {fields.map((field, index) => (
              <div key={index} className="py-1">
                <Row>
                  <SelectField
                    control={control}
                    errors={errors}
                    field={{
                      description: "NavigationType",
                      label: "NAVIGATION TYPE",
                      fieldId: `navigations.${index}.navigationType`,
                      placeholder: "select navigation type",
                      // selectRecordType: "",
                      multiple: false,
                      customData: customList,
                    }}
                    changeHandler={(event) => {
                      setShow(!show);
                    }}
                    blurHandler={null}
                  />
                  <SelectField
                    control={control}
                    errors={errors}
                    field={{
                      description: "Navigation",
                      label: "NAVIGATION",
                      fieldId: `navigations.${index}.navigation`,
                      placeholder: "select navigation link",
                      selectRecordType: "appNavigationLink",
                      multiple: false,
                    }}
                    changeHandler={null}
                    blurHandler={null}
                  />
                  {/* </Col> */}
                  <Col className="mt-4">
                    <span>
                      <Button type="button" onClick={() => remove(index)}>
                        Delete
                      </Button>
                    </span>
                  </Col>
                </Row>
              </div>
            ))}
            <Row>
              <Col>
                <Button
                  className="m-2"
                  type="button"
                  size="sm"
                  onClick={() => append({ name: "" })}
                >
                  Add Navigations
                </Button>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
          </Row>
        </Container>

        {/* SUBTABS */}
      </AppContentBody>
    </AppContentForm>
  );
}
