# ORCID2IRIS: Academic Importer

A Python-based application to extract publication data from ORCID using their API and generate a CSV file formatted for import into IRIS academic systems.

## Features

- Command-line interface for entering ORCID ID and Access Token.
- Fetches publications from ORCID, including title, DOI, journal, year, and more.
- Generates a CSV file ready for import into IRIS.

## Getting Started

### Prerequisites

- Python 3.7 or higher installed on your system.
- An ORCID Access Token (available from [ORCID API Developer Tools](https://info.orcid.org/documentation/api-tutorials/)).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/orcid-to-iris.git
   cd orcid-to-iris
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   python app.py
   ```

## File Structure

```
.
├── orcid_to_iris
│   ├── services
│   │   └── orcid_service.py    # Handles API requests to ORCID
│   ├── utils
│   │   └── csv_exporter.py     # Handles CSV generation
│   ├── app.py                  # Main Python script
│   └── __init__.py             # Package initializer
├── requirements.txt            # Dependencies
└── README.md
```

## Usage

1. Run the script and provide your ORCID ID and Access Token when prompted.
2. The script fetches publication data from ORCID and generates a CSV file.
3. The generated CSV file can be imported directly into IRIS.

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
