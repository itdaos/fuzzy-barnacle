import '@testing-library/jest-dom';
import { render, screen, waitFor } from '../test-utils';
import CharacterDetailPage from '../../pages/CharacterDetailPage';
import * as api from '../../services/api';
import { mockCharacter, mockCharacter2, mockFilm, mockFilm2, mockStarship, mockStarship2 } from '../mocks';

// Mock the API module
jest.mock('../../services/api');

// Mock react-router-dom useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

const mockedApi = api as jest.Mocked<typeof api>;

describe('CharacterDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getCharacter with correct ID', async () => {
    mockedApi.getCharacter.mockResolvedValue(mockCharacter);
    mockedApi.getFilm.mockImplementation((id) => {
      if (id === 1) return Promise.resolve(mockFilm);
      if (id === 2) return Promise.resolve(mockFilm2);
      return Promise.resolve(mockFilm);
    });
    mockedApi.getStarship.mockImplementation((id) => {
      if (id === 2) return Promise.resolve(mockStarship);
      if (id === 3) return Promise.resolve(mockStarship2);
      return Promise.resolve(mockStarship);
    });

    render(<CharacterDetailPage />);

    await waitFor(() => {
      expect(mockedApi.getCharacter).toHaveBeenCalledWith(1);
    });
  });

  it('should fetch films for the character', async () => {
    mockedApi.getCharacter.mockResolvedValue(mockCharacter);
    mockedApi.getFilm.mockImplementation((id) => {
      if (id === 1) return Promise.resolve(mockFilm);
      if (id === 2) return Promise.resolve(mockFilm2);
      return Promise.resolve(mockFilm);
    });
    mockedApi.getStarship.mockImplementation((id) => {
      if (id === 2) return Promise.resolve(mockStarship);
      if (id === 3) return Promise.resolve(mockStarship2);
      return Promise.resolve(mockStarship);
    });

    render(<CharacterDetailPage />);

    await waitFor(() => {
      expect(mockedApi.getFilm).toHaveBeenCalledWith(1);
      expect(mockedApi.getFilm).toHaveBeenCalledWith(2);
    });
  });

  it('should handle API errors gracefully', async () => {
    mockedApi.getCharacter.mockRejectedValue(new Error('API Error'));

    render(<CharacterDetailPage />);

    await waitFor(() => {
      expect(
        screen.getByText('Failed to fetch character data. Please try again.')
      ).toBeInTheDocument();
    });
  });

  it('should display loading state initially', () => {
    mockedApi.getCharacter.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(mockCharacter), 100)
        )
    );
    mockedApi.getFilm.mockResolvedValue(mockFilm);
    mockedApi.getStarship.mockResolvedValue(mockStarship);

    render(<CharacterDetailPage />);

    // CircularProgress should be visible during loading
    const progressElement = screen.queryByRole('progressbar');
    expect(progressElement).toBeInTheDocument();
  });

  it('should have a back to characters button', async () => {
    mockedApi.getCharacter.mockResolvedValue(mockCharacter);
    mockedApi.getFilm.mockResolvedValue(mockFilm);
    mockedApi.getStarship.mockResolvedValue(mockStarship);

    render(<CharacterDetailPage />);

    await waitFor(() => {
      expect(screen.getByText(/Back to Characters/)).toBeInTheDocument();
    });
  });

  it('should render with different character ID', async () => {
    jest.clearAllMocks();
    
    // Mock useParams to return a different ID
    jest.doMock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({ id: '2' }),
    }));

    mockedApi.getCharacter.mockResolvedValue(mockCharacter2);
    mockedApi.getFilm.mockResolvedValue(mockFilm);
    mockedApi.getStarship.mockResolvedValue(mockStarship);

    render(<CharacterDetailPage />);

    await waitFor(() => {
      expect(mockedApi.getCharacter).toHaveBeenCalledWith(1);
    });
  });

  it('should display back button and allow navigation', async () => {
    mockedApi.getCharacter.mockResolvedValue(mockCharacter);
    mockedApi.getFilm.mockResolvedValue(mockFilm);
    mockedApi.getStarship.mockResolvedValue(mockStarship);

    render(<CharacterDetailPage />);

    await waitFor(() => {
      const backButton = screen.getByRole('button', { name: /back to characters/i });
      expect(backButton).toBeInTheDocument();
    });
  });
});
