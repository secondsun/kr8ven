import React, { useState } from 'react';
import { PageSection, Title } from '@patternfly/react-core';

import {
  Toolbar,
  Button,
  ToolbarGroup,
  ToolbarItem,
  ToolbarSection,
  Form,
  FormGroup,
  TextInput,
  TextArea,
  FormSelectionOption,
  FormSelect,
  Checkbox,
  ActionGroup,
  Radio
} from '@patternfly/react-core';

export const RepositoryForm = ()=> {

    const [name, setName] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = (event) => {
        console.log("Submitted", name, identifier, url)
        event.preventDefault();
    }
    
    return <PageSection>
    <Title size="lg">
      Create Repository
    </Title>
    <Form isHorizontal onSubmit={handleSubmit}>
    <FormGroup
          label="Repository Name"
          isRequired
          fieldId="repository-name"
          helperText="Please give the name of the repository"
        >
          <TextInput
            isRequired
            value={name}
            type="text"
            onChange={event=>setName(event)}
            id="repository-name"
            aria-describedby="repository-name-helper"
            name="repository-name"
          />
        </FormGroup>
        <FormGroup
          label="Repository Identifier"
          isRequired
          fieldId="repository-identifier"
          helperText="Please give the identifier of the repository"
        >
          <TextInput
            isRequired
            value={identifier}
            type="text"
            onChange={event=>{ setIdentifier(event)}}
            id="repository-identifier"
            aria-describedby="repository-identifier-helper"
            name="repository-identifier"
          />
        </FormGroup>
        <FormGroup
          label="Repository URL"
          isRequired
          fieldId="repository-url"
          helperText="Please give the url of the repository"
        >
          <TextInput
            isRequired
            value={url}
            type="text"
            onChange={event=>setUrl(event)}
            id="repository-url"
            aria-describedby="repository-url-helper"
            name="repository-url"
          />
        </FormGroup>
        
        <ActionGroup>
          <Button variant="primary" onClick={handleSubmit}>Submit form</Button>
          <Button variant="secondary"  component="a" href="repositories">Cancel</Button>
        </ActionGroup>
      </Form>
  </PageSection>
}