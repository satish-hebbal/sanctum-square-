import { LoaderPage } from "@/components/ui/LogoLoader";

/**
 * One loading state for every route.
 *
 * The pages are all static and prefetched, so on a decent connection this is
 * never seen — which is the point. It appears only when there is an actual
 * wait: a phone on a slow network tapping through to a project before its
 * payload has arrived, or a cold route in development.
 *
 * It lives at the root rather than per segment so there is one answer to "the
 * page is coming" for the whole site, the same way there is one reveal system
 * and one menu.
 */
export default function Loading() {
  return <LoaderPage />;
}
