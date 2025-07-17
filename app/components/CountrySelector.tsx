import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { MdLocationOn, MdPlace } from "react-icons/md";

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasError?: boolean;
}

function CountrySelector({
  value,
  onChange,
  placeholder = "Select a country",
  hasError = false,
}: CountrySelectorProps) {
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (selectedOption: any) => {
    // Extract just the label string for the form
    onChange(selectedOption ? selectedOption.label : "");
  };

  // Find the option object that matches the current string value
  const selectedOption =
    options.find((option) => option.label === value) || null;

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "#374151",
      borderColor: hasError
        ? "#f87171"
        : state.isFocused
        ? "#3b82f6"
        : "#4b5563",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.5)" : "none",
      borderRadius: "0.5rem",
      padding: "0.375rem 0.25rem",
      minHeight: "3rem",
      "&:hover": {
        borderColor: state.isFocused ? "#3b82f6" : "#6b7280",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#374151",
      borderRadius: "0.5rem",
      border: "1px solid #4b5563",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
        ? "#4b5563"
        : "#374151",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#4b5563",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#ffffff",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#9ca3af",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#ffffff",
    }),
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={changeHandler}
      placeholder={placeholder}
      styles={customStyles}
      isSearchable
    />
  );
}

export default CountrySelector;
