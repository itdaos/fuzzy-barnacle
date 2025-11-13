import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '../test-utils';
import CharactersPage from '../../pages/CharactersPage';
import * as api from '../../services/api';
import { mockCharacter, mockCharacter2 } from '../mocks';

// Mock the API module
jest.mock('../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

describe('CharactersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the page title', async () => {
    mockedApi.getCharacters.mockResolvedValue({
      count: 2,
      next: null,
      previous: null,
      results: [mockCharacter, mockCharacter2],
    });

    render(<CharactersPage />);
    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument();
  });

  it('should render List View and Grid View buttons', async () => {
    mockedApi.getCharacters.mockResolvedValue({
      count: 2,
      next: null,
      previous: null,
      results: [mockCharacter, mockCharacter2],
    });

    render(<CharactersPage />);
    expect(screen.getByText('List View')).toBeInTheDocument();
    expect(screen.getByText('Grid View')).toBeInTheDocument();
  });

  it('should fetch and display characters', async () => {
    mockedApi.getCharacters.mockResolvedValue({
      count: 2,
      next: null,
      previous: null,
      results: [mockCharacter, mockCharacter2],
    });

    render(<CharactersPage />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('C-3PO')).toBeInTheDocument();
    });
  });

  it('should display character details in list view', async () => {
    mockedApi.getCharacters.mockResolvedValue({
      count: 2,
      next: null,
      previous: null,
      results: [mockCharacter],
    });

    render(<CharactersPage />);

    await waitFor(() => {
      expect(screen.getByText(/male/)).toBeInTheDocument();
      expect(screen.getByText(/19BBY/)).toBeInTheDocument();
      expect(screen.getByText(/172/)).toBeInTheDocument();
      expect(screen.getByText(/77/)).toBeInTheDocument();
    });
  });

  it('should toggle to grid view', async () => {
    mockedApi.getCharacters.mockResolvedValue({
      count: 2,
      next: null,
      previous: null,
      results: [mockCharacter, mockCharacter2],
    });

    render(<CharactersPage />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    const gridViewButton = screen.getByText('Grid View');
    fireEvent.click(gridViewButton);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('should handle pagination', async () => {
    mockedApi.getCharacters.mockResolvedValue({
      count: 20,
      next: 'https://sw-api.starnavi.io/people/?page=2',
      previous: null,
      results: [mockCharacter],
    });

    render(<CharactersPage />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    // Check that API was called with page 1
    expect(mockedApi.getCharacters).toHaveBeenCalledWith(1);
  });

  it('should display loading state initially', () => {
    mockedApi.getCharacters.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() =>
            resolve({
              count: 1,
              next: null,
              previous: null,
              results: [mockCharacter],
            }),
            100
          )
        )
    );

    render(<CharactersPage />);

    // CircularProgress should be visible during loading
    const progressElement = screen.queryByRole('progressbar');
    expect(progressElement).toBeInTheDocument();
  });

  it('should display error message on API failure', async () => {
    mockedApi.getCharacters.mockRejectedValue(new Error('API Error'));

    render(<CharactersPage />);

    await waitFor(() => {
      expect(
        screen.getByText('Failed to fetch characters. Please try again.')
      ).toBeInTheDocument();
    });
  });

  it('should call getCharacters with correct page number', async () => {
    mockedApi.getCharacters.mockResolvedValue({
      count: 2,
      next: null,
      previous: null,
      results: [mockCharacter],
    });

    render(<CharactersPage />);

    await waitFor(() => {
      expect(mockedApi.getCharacters).toHaveBeenCalledWith(1);
    });
  });
});
