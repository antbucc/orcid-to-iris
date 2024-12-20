# ORCID2IRIS: Academic Importer

A React-based web application to extract publication data from ORCID using their API and generate a CSV file formatted for import into IRIS academic systems.

## Features

- User-friendly React interface for entering ORCID ID and Access Token.
- Fetches publications from ORCID, including title, DOI, journal, year, and more.
- Generates a CSV file ready for import into IRIS.

## Getting Started

### Prerequisites

- Node.js installed on your system.
- An ORCID Access Token (available from [ORCID API Developer Tools](https://info.orcid.org/documentation/api-tutorials/)).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/orcid-to-iris.git
   cd orcid-to-iris
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`.

## File Structure

```
.
├── public
├── src
│   ├── services
│   │   └── orcidService.js    # Handles API requests to ORCID
│   ├── utils
│   │   └── csvExporter.js     # Handles CSV generation
│   ├── App.js                 # Main React component
│   └── index.js               # Entry point
├── package.json
└── README.md
```

## Usage

1. Open the app in your browser.
2. Enter your ORCID ID and Access Token into the provided input fields.
3. Click "Generate CSV".
4. The app will fetch publication data from ORCID and generate a CSV file for download.

## Example CSV Output

```
Title,Authors,DOI,Journal,Year,Volume,Issue,Pages,Abstract
"Machine Learning Applications in Medicine","John Doe, Jane Smith","10.1000/example1","Journal of AI Research",2023,45,3,"123-145","This paper explores the application of machine learning in medical diagnostics."
"Deep Learning for Recommender Systems","Alice Brown, Bob White","10.1000/example2","International Journal of Computer Science",2022,30,4,"200-220","An overview of deep learning techniques for recommender systems and their performance."
```

## Future Enhancements

- Add support for fetching authors from CrossRef or Scopus.
- Include error handling for invalid ORCID IDs or Access Tokens.
- Allow custom mapping for IRIS-specific requirements.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License.
