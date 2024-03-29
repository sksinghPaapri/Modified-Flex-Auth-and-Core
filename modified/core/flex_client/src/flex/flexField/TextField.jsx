import React from "react";
import { Form, Col, OverlayTrigger, Popover } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TextField({
  field,
  index,
  register,
  errors,
  changeHandler,
  blurHandler,
  isAddMode,
}) {
  return (
    <Form.Group key={index} as={Col} md="4" className="mb-2">
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="auto"
        overlay={
          <Popover id="popover-basic">
            <Popover.Header as="h3">Field Description</Popover.Header>
            <Popover.Body>
              {field?.description
                ? field?.description
                : "No description found!"}
            </Popover.Body>
          </Popover>
        }
      >
        <Form.Label className="m-0">{field?.label}</Form.Label>
      </OverlayTrigger>

      <Form.Control
        size="sm"
        style={{ maxWidth: "400px" }}
        disabled={field?.disabled}
        type="text"
        id={field?.fieldId}
        name={field?.fieldId}
        placeholder={field?.placeholder}
        isInvalid={errors[field?.fieldId]}
        {...register(field?.fieldId, {
          required: field?.required ? field?.validationMessage : false,
          onBlur: (event) =>
            blurHandler &&
            blurHandler(event, { type: field?.type, id: field?.fieldId }),
          onChange: (event) =>
            changeHandler &&
            changeHandler(event, {
              type: field?.type,
              id: field?.fieldId,
              targetValue: event.target?.value,
            }),
        })}
      />

      <Form.Control.Feedback type="invalid">
        {errors[field?.fieldId] && errors[field.fieldId]["message"]}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
