import os
import requests
from bs4 import BeautifulSoup
import csv
import concurrent.futures

def get_soup(url):
    response = requests.get(url)
    return BeautifulSoup(response.content, "lxml")

def get_team_names_and_positions(soup):
    team_names = [team.get_text() for team in soup.select("div.player-name > p > span.player-team")]
    positions = [position.get_text() for position in soup.select("div.position-team > p:nth-of-type(1)")]

    for i, (team_name, position) in enumerate(zip(team_names, positions)):
        if "1st" in team_name or "2nd" in team_name or "3rd" in team_name:
            team_names[i] = ""  # Remove "FA" for draft picks
        elif position == "PICK":
            team_names[i] = ""  # Remove "FA" for draft picks
        elif team_name == "FA":
            pass

    return team_names, positions

def get_values(soup):
    raw_ratings = soup.select("div.value p")[1:]
    return [rating.get_text().strip() for rating in raw_ratings]

def get_ages(soup):
    ages = []
    for element in soup.select("div.position-team"):
        age_element = element.select_one("p:nth-of-type(2)")
        if age_element and age_element.get_text().strip() != "PICK":
            ages.append(age_element.get_text().split()[0])
        else:
            ages.append("")
    return ages

def get_tiers(soup):
    tiers = []
    for tier_element in soup.select("div.player-info"):
        tier_text = tier_element.find("p", class_="position")
        if tier_text and "Tier" in tier_text.get_text():
            tiers.append(tier_text.get_text())
    return tiers

def get_trends(soup):
    raw_trends = []
    for trend_element in soup.select("div.trend p"):
        trend = trend_element.get_text()
        if trend.startswith("0"):
            raw_trends.append(trend)
        elif "trend-up" in trend_element.get('class', []):
            raw_trends.append(trend + "u")
        elif "trend-down" in trend_element.get('class', []):
            raw_trends.append(trend + "d")
        else:
            raw_trends.append(trend)
    return raw_trends[2:]

def get_ranks(soup):
    return [rank.get_text() for rank in soup.select("div.rank-number p")][1:]

def get_paths(soup):
    path_elements = soup.select("div.player-name a")
    return [path.get("href") for path in path_elements]

def fetch_data(url):
    soup = get_soup(url)
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [
            executor.submit(get_team_names_and_positions, soup),
            executor.submit(get_values, soup),
            executor.submit(get_ages, soup),
            executor.submit(get_tiers, soup),
            executor.submit(get_trends, soup),
            executor.submit(get_ranks, soup),
            executor.submit(get_paths, soup)
        ]

        team_names, positions = futures[0].result()
        values = futures[1].result()
        ages = futures[2].result()
        tiers = futures[3].result()
        trends = futures[4].result()
        ranks = futures[5].result()
        paths = futures[6].result()

    player_names = [player.get_text() for player in soup.select("div.player-name > p > a")]

    return player_names, team_names, positions, values, ages, tiers, trends, ranks, paths

def main():
    url = "https://keeptradecut.com/dynasty-rankings?filters=QB|WR|RB|TE|RDP"
    player_names, team_names, positions, values, ages, tiers, trends, ranks, paths = fetch_data(url)

    # Save the data into a CSV file inside the "temp" folder
    temp_directory = os.path.join(os.path.dirname(__file__), "..", "temp")
    
    # Create the "temp" folder if it doesn't exist
    os.makedirs(temp_directory, exist_ok=True)
    
    csv_file_path = os.path.join(temp_directory, "ktc.csv")
    with open(csv_file_path, "w", newline="") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["rank", "player", "team", "position", "age", "tier", "trend", "value", "path"])
        writer.writerows(zip(ranks, player_names, team_names, positions, ages, tiers, trends, values, paths))

if __name__ == "__main__":
    main()
