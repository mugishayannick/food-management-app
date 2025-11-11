// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";

// Configure test ID attribute to match project convention
configure({ testIdAttribute: "data-test-id" });

