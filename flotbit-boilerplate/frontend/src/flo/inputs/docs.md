# StepProgress Component

A React component that renders a step-based progress bar.
Start from index 1

---

## 📌 Props

### `total` (number, optional, default: 3)

Total number of total in the progress bar. 

---

### `defaultValue` (number, optional, default: 1)

initial step value. 

---

### `onChange` (function, optional, default: null)

Returns number when step selected. 

---

### `showLabels` (boolean, optional, default: true)

Show number value or not.

---

### `style` (string, optional, default: {})

inline css style if any additional style required. 

---

### `className` (string, optional, default: "")

to add class to component.

-----

# ReviewStar Component

Takes review in stars

---

## 📌 Props

### `total` (number, optional, default: 5)

Total number of icons(Star). 

---

### `defaultValue` (number, optional, default: 3)

initial number of stars selected. 

---

### `onChange` (function, required, default: null)

Returns number when star selected.

---

### `style` (string, optional, default: {})

inline css style if any additional style required. 

---

### `className` (string, optional, default: "")

to add class to component.

-----

# NumberInput Component

Takes Number input between range given

---

## 📌 Props

### `defaultValue` (number, optional, default: 1)

initial number of stars selected. 

---

### `min` (number, optional, default: 1)

Minimum number it accepts. 

---

### `max` (number, optional, default: 99)

Maximum number it accepts. 

---

### `onChange` (function, required, default: null)

to add class to component.

---

### `style` (string, optional, default: {})

inline css style if any additional style required. 

---

### `className` (string, optional, default: "")

to add class to component.

-----

# MultiChoice Component

takes multichoice or radio button input

---

## 📌 Props

### `choices` (array, required, default: [])

Number of choices for multi choice.

example: 
[
    { value: 0, label: "Choice 1" },
    { value: 1, label: "Choice 2" },
]

---

### `multiSelect` (boolean, optional, default: true)

if user allowed to select multiple option or not.

---

### `onChange` (function, required, default: null)

If `multiSelect` is `false`, Returns a single number.  
If `multiSelect` is `true`, Returns an array of numbers.

---

### `defaultValue` (number | number[], optional, default: [])

The initially selected option(s).  
If `multiSelect` is `false`, provide a single number.  
If `multiSelect` is `true`, provide an array of numbers.

---

### `style` (string, optional, default: {})

inline css style if any additional style required. 

---

### `className` (string, optional, default: "")

to add class to component.

-----

# FileUpload Component

Takes File input.

---

## 📌 Props

### `acceptedFileTypes` (string, optional, default: "")

types of file accepts.

example: 
".pdf,.jpg,.jpeg,.png,.doc,.docx"

---

### `maxSize` (boolean, optional, default: 5)

maximum MB of file size it.

---

### `onChange` (function, required, default: null)

returns file selected or returns null if file removed.

---

### `style` (string, optional, default: {})

inline css style if any additional style required. 

---

### `className` (string, optional, default: "")

to add class to component.

-----

# ReviewEmojis Component

Takes review with emoji icons.

---

## 📌 Props

### `defaultValue` (number, optional, default: 0)

initial selected value.

---

### `choices` (boolean, required, default: true)

choices to select from.

Example:
[
    { value: 1, icon: "😞", label: "Terrible" },
    { value: 2, icon: "😟", label: "Bad" },
    { value: 3, icon: "🙂", label: "Ok" },
    { value: 4, icon: "😃", label: "Good" },
    { value: 5, icon: "😍", label: "Amazing" },
]

---

### `onChange` (boolean, required, default: true)

Returns value when emoji selected.

---

### `style` (string, optional, default: {})

inline css style if any additional style required. 

---

### `className` (string, optional, default: "")

to add class to component.

-----

# YesOrNoInput Component

Takes Yes or No input.

---

## 📌 Props

### `defaultValue` (boolean, optional, default: null)

initial selected value.

---

### `onChange` (function, required, default: null)

Returns value when selected.

---

### `style` (string, optional, default: {})

inline css style if any additional style required. 

---

### `className` (string, optional, default: "")

to add class to component.

-----
