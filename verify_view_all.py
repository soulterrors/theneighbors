from playwright.sync_api import sync_playwright, expect

def verify_view_all_button(page):
    print("Navigating to /coffee...")
    page.goto("http://localhost:3000/coffee")

    # Wait for the button to be visible
    # We have two buttons, so we use .first or .nth(0)
    links = page.get_by_role("link", name="Browse All Drinks")

    print(f"Found {links.count()} links.")

    link = links.first
    print("Checking if first link is visible...")
    expect(link).to_be_visible()

    # Check that it DOES NOT contain a button element
    button_inside = link.locator("button")
    if button_inside.count() > 0:
        print("FAIL: Found <button> inside <Link>!")
    else:
        print("PASS: No <button> inside <Link>.")

    # Focus the link to verify focus styles
    print("Focusing the link...")
    link.focus()

    # Take screenshot of the button area
    print("Taking screenshot...")
    link.screenshot(path="/home/jules/verification/coffee_view_all_focused.png")

    # Also verify library page
    print("Navigating to /library...")
    page.goto("http://localhost:3000/library")

    links_lib = page.get_by_role("link", name="Browse All Books")
    link_lib = links_lib.first
    expect(link_lib).to_be_visible()

    print("Focusing the library link...")
    link_lib.focus()
    link_lib.screenshot(path="/home/jules/verification/library_view_all_focused.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_view_all_button(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
