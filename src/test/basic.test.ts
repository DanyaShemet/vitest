import ProfileInfo from "../components/ProfileInfo.vue";
import "@testing-library/jest-dom";
import { expect, MockedFunction } from "vitest";
import axios from "axios";
import { post } from "../mocks";

import { render, waitFor } from "@testing-library/vue";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("component ProfileInfo", () => {
  it("api loading", async () => {
    (axios.get as MockedFunction<typeof axios["get"]>).mockResolvedValue(
        undefined
    );

    const view = render(ProfileInfo);

    await waitFor(() => {
      expect(view.getByText("Load")).toBeInTheDocument();
    });

    expect(view.queryByText(post.userId)).not.toBeInTheDocument();
  });

  it("api success", async () => {
    (axios.get as MockedFunction<typeof axios["get"]>).mockResolvedValue({
      data: post,
    });

    const view = render(ProfileInfo);

    await waitFor(() => {
      expect(view.getByText(post.userId)).toBeInTheDocument();
    });

    expect(view.queryByText("Load")).not.toBeInTheDocument();
  });

  it("api error", async () => {
    (axios.get as MockedFunction<typeof axios["get"]>).mockRejectedValue(
        Error("Error")
    );

    const view = render(ProfileInfo);

    await waitFor(() => {
      expect(view.getByText("Error")).toBeInTheDocument();
    });

    expect(view.queryByText("Load")).not.toBeInTheDocument();
    expect(view.queryByText(post.userId)).not.toBeInTheDocument();
  });
});